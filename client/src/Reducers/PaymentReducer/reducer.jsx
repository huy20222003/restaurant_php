import {
    GET_ALL_PAYMENT, GET_ONE_PAYMENT
  } from './constant';
  
  export const initPaymentsState = {
    payments: [],
    payment: ''
  };
  
  export const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_PAYMENT:
        return {
          ...state,
          payments: payload,
        };
        case GET_ONE_PAYMENT:
          return {
            ...state,
            payment: payload,
          };
      default:
        return {
          ...state,
        };
    }
  };
  