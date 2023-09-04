import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORY,
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
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
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
