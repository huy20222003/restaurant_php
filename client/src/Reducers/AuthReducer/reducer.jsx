import { SET_AUTH } from './constants';

export const initStateAuth = {
  isAuthenticated: false,
  user: null,
  role: null
};

export const reducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user, role },
  } = action;

  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated,
        user,
        role,
      };
    default:
      return {
        ...state,
      };
  }
};
