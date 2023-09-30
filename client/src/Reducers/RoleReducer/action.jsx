import { CREATE_ROLE, DELETE_ROLE, GET_ALL_ROLE, GET_ONE_ROLE, UPDATE_ROLE } from "./constant"

export const getAllRole = (payload)=> {
    return {
        type: GET_ALL_ROLE,
        payload
    }
}

export const getOneRole = (payload)=> {
    return {
        type: GET_ONE_ROLE,
        payload
    }
}

export const createRole = (payload)=> {
    return {
        type: CREATE_ROLE,
        payload
    }
}

export const updateRole = (payload)=> {
    return {
        type: UPDATE_ROLE,
        payload
    }
}

export const deleteRole = (payload)=> {
    return {
        type: DELETE_ROLE,
        payload
    }
}