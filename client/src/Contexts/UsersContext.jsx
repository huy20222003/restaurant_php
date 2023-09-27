import { createContext, useCallback, useReducer } from 'react';
import { initUsersState, reducer } from '../Reducers/UsersReducer/reducer';
import { getAllUsers, createUser, deleteUser, getOneUser } from '../Reducers/UsersReducer/action';
import userApi from '../Service/userApi';

export const UsersContext = createContext();

export const UsersProvider = (prop) => {
  const [usersState, dispatch] = useReducer(reducer, initUsersState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };


  const handleGetAllUser = useCallback(async()=> {
    try {
        const response = await userApi.getAll();
        dispatch(getAllUsers(response.data.users));
    } catch (error) {
        return handleError(error);
    }
  }, []);

  const handleGetOneUser = useCallback(async(userId)=> {
    try {
        const response = await userApi.getOne(userId);
        dispatch(getOneUser(response.data.user));
        return response.data;
    } catch (error) {
        return handleError(error);
    }
  }, []);

  const handleCreateUser = useCallback(async(data)=> {
    try {
      const response = await userApi.createUser(data);
      dispatch(createUser(response.data.user));
      return response.data;
  } catch (error) {
      return handleError(error);
  }
  }, []);

  const handleDeleteUser = useCallback(async(userId)=> {
    try {
      const response = await userApi.deleteUser(userId);
      dispatch(deleteUser(userId));
      return response.data;
  } catch (error) {
      return handleError(error);
  }
  }, []);

  const handleUpdateAvatar = useCallback(async(avatarUpdate)=> {
    try {
      const response = await userApi.updateAvatar(avatarUpdate);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdateDetail = useCallback(async(updateForm)=> {
    try {
      const response = await userApi.updateDetail(updateForm);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdatePasswordUser = useCallback(async (newPassword) => {
    try {
      const response = await userApi.updatePassword(newPassword);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const UsersContextData = {
    usersState,
    handleGetAllUser,
    handleCreateUser,
    handleGetOneUser,
    handleDeleteUser,
    handleUpdateAvatar,
    handleUpdateDetail,
    handleUpdatePasswordUser,
  };

  return (
    <UsersContext.Provider value={UsersContextData}>
      {prop.children}
    </UsersContext.Provider>
  );
};
