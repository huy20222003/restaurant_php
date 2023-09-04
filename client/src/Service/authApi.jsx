import axiosConfig from "./axiosConfig";

const authApi = {
    login: (data)=> {
        const url = '/auth/login';
        return axiosConfig.post(url, data);
    },
    register: (data)=> {
        const url = '/auth/register';
        return axiosConfig.post(url, data);
    },
    loginAdmin: (data)=> {
        const url = '/auth/admin/login';
        return axiosConfig.post(url, data);
    }
}

export default authApi;