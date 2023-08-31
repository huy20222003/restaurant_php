import { createContext, useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { initStateAuth, reducer } from '../Reducers/AuthReducer/reducer';
import { API_URL } from '../constants';
import { setAuth } from '../Reducers/AuthReducer/action';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, initStateAuth);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const setAuthenticatedUser = (isAuthenticated, user, role) => {
    dispatch(setAuth({ isAuthenticated, user, role }));
  };

  const loadUser = useCallback(async () => {
    try {
      const accessToken = Cookies.get('user');
      if (!accessToken) {
        setAuthenticatedUser(false, null, null);
        return;
      } else {
        setAuthToken(accessToken);
        const response = await axios.get(`${API_URL}/auth/account`);

        if (response.data.success) {
          setAuthenticatedUser(true, response.data.data.user, response.data.data.role);
        } else {
          setAuthenticatedUser(false, null, null);
          Cookies.remove('user');
          setAuthToken(null);
        }
      }
    } catch (error) {
      setAuthenticatedUser(false, null);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        registerForm
      );
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const loginUser = async (loginForm) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const loginAdmin = async (loginForm) => {
    try {
      const response = await axios.post(`${API_URL}/auth/admin/login`, loginForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const logoutUser = () => {
    Cookies.remove('user');
    setAuthenticatedUser(false, null);
  };

  const handleRefreshToken = useCallback(async () => {
    try {
      const refreshToken = Cookies.get('refresh');
      if (!refreshToken) {
        return;
      } else {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        if (response.data.success) {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
          Cookies.set('user', response.data.data, {
            expires: expiration,
          });
          await loadUser();
        }
      }
    } catch (error) {
      return handleError(error);
    }
  }, [loadUser]);

  //Tự động handle refreshToken mỗi khi loadUser
  useEffect(() => {
    handleRefreshToken();
  }, [handleRefreshToken]);

  const AuthContextData = {
    authState,
    loadUser,
    registerUser,
    loginUser,
    loginAdmin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
