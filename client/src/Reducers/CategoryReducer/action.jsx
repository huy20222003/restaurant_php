import { CREATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORY, GET_ONE_CATEGORY, UPDATE_CATEGORY } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_CATEGORY,
        payload
    }
}

export const getOne = (payload)=> {
    return {
        type: GET_ONE_CATEGORY,
        payload
    }
}

export const createCategory = (payload)=> {
    return {
        type: CREATE_CATEGORY,
        payload
    }
}

export const updateCategory = (payload)=> {
    return {
        type: UPDATE_CATEGORY,
        payload
    }
}

export const deleteCategory = (payload)=> {
    return {
        type: DELETE_CATEGORY,
        payload
    }
}