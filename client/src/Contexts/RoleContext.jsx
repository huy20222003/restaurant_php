import { createContext, useCallback, useReducer } from 'react';
//reducer
import { initRoleState, reducer } from '../Reducers/RoleReducer/reducer';
import {
  getAllRole,
  getOneRole,
  createRole,
  updateRole,
  deleteRole,
} from '../Reducers/RoleReducer/action';
//api
import roleApi from '../Service/roleApi';
//---------------------------------------------------------------

export const RoleContext = createContext();

export const RoleProvider = (prop) => {
  const [roleState, dispatch] = useReducer(reducer, initRoleState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAllRole = useCallback(async () => {
    try {
      const response = await roleApi.getAll();
      if (response.data.success) {
        dispatch(getAllRole(response.data.roles));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleGetOneRole = useCallback(async (roleId) => {
    try {
      const response = await roleApi.getOne(roleId);
      if (response.data.success) {
        dispatch(getOneRole(response.data.role));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateRole = useCallback(async (data) => {
    try {
      const response = await roleApi.createRole(data);
      if (response.data.success) {
        dispatch(createRole(response.data.role));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleUpdateRole = useCallback(async (roleId, data) => {
    try {
      const response = await roleApi.updateRole(roleId, data);
      if (response.data.success) {
        dispatch(updateRole(response.data.role));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleDeleteRole = useCallback(async (roleId) => {
    try {
      const response = await roleApi.deleteRole(roleId);
      if (response.data.success) {
        dispatch(deleteRole(response.data.role));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const CategoryData = {
    roleState,
    handleGetAllRole,
    handleGetOneRole,
    handleCreateRole,
    handleUpdateRole,
    handleDeleteRole,
  };

  return (
    <RoleContext.Provider value={CategoryData}>
      {prop.children}
    </RoleContext.Provider>
  );
};
