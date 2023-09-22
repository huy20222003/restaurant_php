import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, GET_ALL_EMPLOYEES, GET_ONE_EMPLOYEE, UPDATE_EMPLOYEE} from './constants';

export const getAllEmployees = (payload)=> {
    return {
        type: GET_ALL_EMPLOYEES,
        payload
    }
}

export const getOneEmployee = (payload)=> {
    return {
        type: GET_ONE_EMPLOYEE,
        payload
    }
}

export const createEmployee = (payload)=> {
    return {
        type: CREATE_EMPLOYEE,
        payload
    }
}

export const updateEmployee = (payload)=> {
    return {
        type: UPDATE_EMPLOYEE,
        payload
    }
}

export const deleteEmployee = (payload)=> {
    return {
        type: DELETE_EMPLOYEE,
        payload
    }
}