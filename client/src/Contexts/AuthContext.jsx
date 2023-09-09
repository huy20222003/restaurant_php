import { createContext, useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { initStateAuth, reducer } from '../Reducers/AuthReducer/reducer';
import { API_URL } from '../constants';
import { setAuth } from '../Reducers/AuthReducer/action';
import setAuthToken from '../utils/setAuthToken';
import authApi from '../Service/authApi';

export const AuthContext = createContext();

export const AuthProvider = (prop) => {
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
      }

      setAuthToken(accessToken);

      let accountUrl = `${API_URL}/auth/account`;
      if (window.location.href.includes('admin')) {
        accountUrl = `${API_URL}/auth/admin/account`;
      }

      const response = await axios.get(accountUrl);

      if (response.data.success) {
        setAuthenticatedUser(true, response.data.user, response.data.role);
      } else {
        setAuthenticatedUser(false, null, null);
        Cookies.remove('user');
        setAuthToken(null);
      }
    } catch (error) {
      setAuthenticatedUser(false, null, null);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const registerUser = async (registerForm) => {
    try {
      const response = await authApi.register(registerForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const loginUser = async (loginForm) => {
    try {
      const response = await authApi.login(loginForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const loginAdmin = async (loginForm) => {
    try {
      const response = await authApi.loginAdmin(loginForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const logoutUser = () => {
    Cookies.remove('user');
    setAuthenticatedUser(false, null, null);
  };

  // const handleRefreshToken = useCallback(async () => {
  //   try {
  //     const refreshToken = Cookies.get('refresh');
  //     if (refreshToken) {
  //       const accountUrl = window.location.href.includes('admin')
  //         ? `${API_URL}/auth/admin/refresh`
  //         : `${API_URL}/auth/refresh`;

  //       const response = await axios.post(accountUrl, {
  //         refreshToken,
  //       });

  //       const newToken = response.data.accessToken;

  //       // Lưu token mới vào cookie
  //       const expiration = new Date();
  //       expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
  //       Cookies.set('user', newToken, {
  //         expires: expiration,
  //       });
  //     }
  //   } catch (error) {
  //     return handleError(error);
  //   }
  // }, []);

  // //Tự động handle refreshToken mỗi khi loadUser
  // useEffect(() => {
  //   handleRefreshToken();
  // }, [handleRefreshToken]);

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
      {prop.children}
    </AuthContext.Provider>
  );
};
