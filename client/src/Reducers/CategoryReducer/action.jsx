import { CREATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORY } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_CATEGORY,
        payload
    }
}

export const createCategory = (payload)=> {
    return {
        type: CREATE_CATEGORY,
        payload
    }
}

export const deleteCategory = (payload)=> {
    return {
        type: DELETE_CATEGORY,
        payload
    }
}