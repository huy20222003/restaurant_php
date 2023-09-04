import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, GET_ALL_EMPLOYEES } from './constants';

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
      case CREATE_EMPLOYEE:
        return {
          ...state,
          employees: [...state.employees, payload],
        };
        case DELETE_EMPLOYEE:
          return {
            ...state,
            employees: state.employees.filter((employee)=> employee._id !== payload),
          };
    default:
      return {
        ...state,
      };
  }
};
