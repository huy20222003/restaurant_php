import { CREATE_DISH, DELETE_DISH, GET_ALL_DISHES, GET_ONE_DISH, SET_PAGE } from "./constants";

export const getAll = (payload)=> {
    return {
        type: GET_ALL_DISHES,
        payload
    }
}

export const getOne = (payload)=> {
    return {
        type: GET_ONE_DISH,
        payload
    }
}

export const setPage = (payload)=> {
    return {
        type: SET_PAGE,
        payload
    }
}

export const createDish = (payload)=> {
    return {
        type: CREATE_DISH,
        payload
    }
}

export const deleteDish = (payload)=> {
    return {
        type: DELETE_DISH,
        payload
    }
}


