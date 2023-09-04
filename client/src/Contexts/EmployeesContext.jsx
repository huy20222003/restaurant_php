import { createContext, useCallback, useEffect, useReducer } from 'react';
import { initEmployeesState, reducer } from '../Reducers/EmployeesReducer/reducer';
import { getAllEmployees, createEmployee, deleteEmployee } from '../Reducers/EmployeesReducer/action';
import employeeApi from '../Service/employeeApi';

export const EmployeesContext = createContext();

export const EmployeesProvider = (prop) => {
  const [employeesState, dispatch] = useReducer(reducer, initEmployeesState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };


  const handleGetAll = useCallback(async()=> {
    try {
        const response = await employeeApi.getAll();
        dispatch(getAllEmployees(response.data.employees));
    } catch (error) {
        return handleError(error);
    }
  }, []);

  useEffect(()=>{
    if(window.location.href.includes('admin')) {
      handleGetAll();
    }
  }, [handleGetAll]);

  const handleCreateEmployee = useCallback(async (data)=> {
    try {
      const response = await employeeApi.createEmployee(data);
      if (response.data.success) {
        dispatch(createEmployee(response.data.employee));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleDeleteEmployee = useCallback(async(employeeId)=> {
    try {
      const response = await employeeApi.deleteEmployee(employeeId);
      dispatch(deleteEmployee(employeeId));
      return response.data;
  } catch (error) {
      return handleError(error);
  }
  }, []);

  const EmployeesData = {
    employeesState,
    handleCreateEmployee,
    handleDeleteEmployee,
  };

  return (
    <EmployeesContext.Provider value={EmployeesData}>
      {prop.children}
    </EmployeesContext.Provider>
  );
};
