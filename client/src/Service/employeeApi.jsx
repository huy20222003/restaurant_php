import axiosConfig from "./axiosConfig";

const dishApi = {
    getAll: ()=> {
        const url = `/employee`;
        return axiosConfig.get(url);
    },
    createEmployee: (data)=> {
        const url = '/employee/create-employee';
        return axiosConfig.post(url, data);
    },
    deleteEmployee: (employeeId)=> {
        const url = `/employee/delete-employee/${employeeId}`;
        return axiosConfig.delete(url);
    }
}

export default dishApi;