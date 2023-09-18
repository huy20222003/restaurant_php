import { GET_CART, UPDATE_CART } from "./constants";

export const initCartState = {
    items: [], 
    totalPrices: 0, 
    userCart: null, 
  };
  
  export const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CART:
        return {
          ...state,
          items: payload.items,
          totalPrices: payload.totalPrices,
          userCart: payload.userCart,
        };
        case UPDATE_CART:
        return {
          ...state,
          items: payload.items,
          totalPrices: payload.totalPrices,
          userCart: payload.userCart,
        };
      default:
        return {
          ...state,
        };
    }
  };
  