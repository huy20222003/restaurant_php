import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORY,
  GET_ONE_CATEGORY,
  UPDATE_CATEGORY,
} from './constants';

export const initCategoryState = {
  category: null,
  categories: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        categories: payload,
      };
      case GET_ONE_CATEGORY:
        return {
          ...state,
          category: payload,
        };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
      };
      case UPDATE_CATEGORY:
        const newCategories = state.categories.map((category) =>
        category._id === payload._id ? payload : category
      );

      return {
        ...state,
        categories: newCategories,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
