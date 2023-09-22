import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_ALL_EMPLOYEES,
  GET_ONE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from './constants';

export const initEmployeesState = {
  employee: null,
  employees: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: payload,
      };
    case GET_ONE_EMPLOYEE:
      return {
        ...state,
        employee: payload,
      };
    case CREATE_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, payload],
      };
    case UPDATE_EMPLOYEE:
      const newEmployees = state.employees.map((employee) =>
      employee._id === payload._id ? payload : employee
    );

    return {
      ...state,
      employees: newEmployees,
    };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee._id !== payload
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
