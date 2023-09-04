import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USERS,
  GET_ONE_USER,
} from './constants';

export const initUsersState = {
  user: null,
  users: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_ONE_USER:
      return {
        ...state,
        user: payload,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, payload],
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};
