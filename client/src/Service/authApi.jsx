import axiosConfig from "./axiosConfig";

const authApi = {
    account: ()=> {
        const url = '/auth/account';
        return axiosConfig.get(url);
    },
    accountAdmin: ()=> {
        const url = '/auth/admin/account';
        return axiosConfig.get(url);
    },
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