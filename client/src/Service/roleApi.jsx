import axiosConfig from "./axiosConfig";

const roleApi = {
    getAll: ()=> {
        const url = `/role`;
        return axiosConfig.get(url);
    },
    getOne: (roleId)=> {
        const url = `/role/${roleId}`;
        return axiosConfig.get(url);
    },
    createRole: (data)=> {
        const url = '/role/create-role';
        return axiosConfig.post(url, data);
    },
    updateRole: (roleId, data)=> {
        const url = `/role/update-role/${roleId}`;
        return axiosConfig.patch(url, data);
    },
    deleteProduct: (roleId)=> {
        const url = `/role/delete-role/${roleId}`;
        return axiosConfig.delete(url);
    },
}

export default roleApi;