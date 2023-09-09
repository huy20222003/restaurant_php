import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCT,
  GET_ONE_PRODUCT,
  SEARCH_PRODUCT,
  SET_PAGE,
} from './constants';

export const initProductsState = {
  product: null,
  products: [],
  currentPage: null,
  totalPages: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    case GET_ONE_PRODUCT:
      return {
        ...state,
        product: payload,
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: payload.currentPage,
        totalPages: payload.totalPages,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((PRODUCT) => PRODUCT._id !== payload),
      };
      case SEARCH_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
