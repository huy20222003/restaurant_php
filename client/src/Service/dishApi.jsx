import axiosConfig from "./axiosConfig";

const dishApi = {
    getAll: (currentPage, pageSize)=> {
        const url = `/dishes?page=${currentPage}&pageSize=${pageSize}`;
        return axiosConfig.get(url);
    },
    getOne: (dishId)=> {
        const url = `/dishes/${dishId}`;
        return axiosConfig.get(url);
    },
    createDish: (data)=> {
        const url = '/dishes/create-dish';
        return axiosConfig.post(url, data);
    },
    deleteDish: (dishId)=> {
        const url = `/dishes/delete-dish/${dishId}`;
        return axiosConfig.delete(url);
    }
}

export default dishApi;