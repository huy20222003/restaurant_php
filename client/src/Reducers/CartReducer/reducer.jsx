import { GET_CART, UPDATE_CART } from "./constants";

export const initCartState = {
    items: null, 
    userCart: null, 
  };
  
  export const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CART:
        return {
          ...state,
          items: payload.cart_details,
          userCart: payload.userId,
        };
        case UPDATE_CART:
        return {
          ...state,
          items: payload.cart_details,
          userCart: payload.userId,
        };
      default:
        return {
          ...state,
        };
    }
  };
  