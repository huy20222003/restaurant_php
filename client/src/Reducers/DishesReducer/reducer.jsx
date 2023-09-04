import {
  CREATE_DISH,
  DELETE_DISH,
  GET_ALL_DISHES,
  GET_ONE_DISH,
  SET_PAGE,
} from './constants';

export const initDishesState = {
  dish: null,
  dishes: [],
  currentPage: null,
  totalPages: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_DISHES:
      return {
        ...state,
        dishes: payload,
      };
    case GET_ONE_DISH:
      return {
        ...state,
        dish: payload,
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: payload.currentPage,
        totalPages: payload.totalPages,
      };
    case CREATE_DISH:
      return {
        ...state,
        dishes: [...state.dishes, payload],
      };
    case DELETE_DISH:
      return {
        ...state,
        dishes: state.dishes.filter((dish) => dish._id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};
