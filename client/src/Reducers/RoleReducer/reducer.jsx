import { CREATE_ROLE, DELETE_ROLE, GET_ALL_ROLE, GET_ONE_ROLE, UPDATE_ROLE } from './constant';

export const initRoleState = {
  role: null,
  roles: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ROLE:
      return {
        ...state,
        roles: payload,
      };
    case GET_ONE_ROLE:
      return {
        ...state,
        role: payload,
      };
    case CREATE_ROLE:
      return {
        ...state,
        roles: [state.roles, payload],
      };
    case UPDATE_ROLE: 
    const newRoles = state.roles.map((role) =>
        role._id === payload._id ? payload : role
      );

      return {
        ...state,
        roles: newRoles,
      };
      case DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((role) => role._id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};
