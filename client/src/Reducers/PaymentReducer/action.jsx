import { GET_ALL_PAYMENT, GET_ONE_PAYMENT } from "./constant"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_PAYMENT,
        payload,
    }
}

export const getOne = (payload)=> {
    return {
        type: GET_ONE_PAYMENT,
        payload,
    }
}