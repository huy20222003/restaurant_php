import { CREATE_RESERVATION, CREATE_TABLE, GET_ALL_RESERVATIONS } from './constants';

export const initReservationsState = {
  reservations: [],
  reservation: '',
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RESERVATIONS:
      return {
        ...state,
        reservations: payload,
      };
      case CREATE_TABLE: {
        return {
          ...state,
          reservation: [...state.reservations, payload],
        };
      }
    case CREATE_RESERVATION: {
      return {
        ...state,
        reservation: [...state.reservations, payload],
      };
    }
    default:
      return {
        ...state,
      };
  }
};
