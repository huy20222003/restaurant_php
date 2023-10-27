import { CREATE_RESERVATION, CREATE_TABLE, GET_ALL_RESERVATIONS } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_RESERVATIONS,
        payload,
    }
}

export const createTable = (payload)=> {
    return {
        type: CREATE_TABLE,
        payload,
    }
}

export const createReservation = (payload)=> {
    return {
        type: CREATE_RESERVATION,
        payload,
    }
}