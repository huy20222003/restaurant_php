import axiosConfig from "./axiosConfig";

const userApi = {
    getAll: ()=> {
        const url = '/user'
        return axiosConfig.get(url);
    },
    getOne: (userId)=> {
        const url =`user/${userId}`;
        return axiosConfig.get(url);
    },
    createUser: (data)=> {
        const url = '/user/create-user';
        return axiosConfig.post(url, data);
    },
    deleteUser: (userId)=> {
        const url = `/user/delete-user/${userId}`;
        return axiosConfig.delete(url);
    }
}

export default userApi;