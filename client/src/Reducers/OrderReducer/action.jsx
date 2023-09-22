import {
  CREATE_ORDER,
  FILTER_ORDER_BY_STATUS,
  GET_ALL_ORDERS,
  GET_ALL_ORDERSBY_ID,
  GET_ONE_ORDER,
} from './constant';

export const getAll = (payload) => {
  return {
    type: GET_ALL_ORDERS,
    payload,
  };
};

export const getAllById = (payload) => {
  return {
    type: GET_ALL_ORDERSBY_ID,
    payload,
  };
};

export const getOne = (payload) => {
  return {
    type: GET_ONE_ORDER,
    payload,
  };
};

export const createOrder = (payload) => {
  return {
    type: CREATE_ORDER,
    payload,
  };
};

export const filterOrderByStatus = (payload) => {
  return {
    type: FILTER_ORDER_BY_STATUS,
    payload,
  };
};
