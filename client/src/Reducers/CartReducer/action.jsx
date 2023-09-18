import { GET_CART, UPDATE_CART } from "./constants"


export const getCart = (payload)=> {
    return {
        type: GET_CART,
        payload
    }
}

export const updateCart = (payload)=> {
    return {
        type: UPDATE_CART,
        payload
    }
}