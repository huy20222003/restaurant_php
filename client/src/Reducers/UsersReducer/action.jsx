import {CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_ONE_USER} from './constants';

export const getAllUsers = (payload)=> {
    return {
        type: GET_ALL_USERS,
        payload
    }
}

export const getOneUser = (payload)=> {
    return {
        type: GET_ONE_USER,
        payload
    }
}


export const createUser = (payload)=> {
    return {
        type: CREATE_USER,
        payload
    }
}

export const deleteUser = (payload)=> {
    return {
        type: DELETE_USER,
        payload
    }
}