import axiosConfig from "./axiosConfig";

const categoryApi = {
    getAll: ()=> {
        const url = '/category';
        return axiosConfig.get(url);
    },
    getOne: (categoryId)=> {
        const url = `/category/${categoryId}`;
        return axiosConfig.get(url);
    },
    createCategory: (data)=> {
        const url = '/category/create-category';
        return axiosConfig.post(url, data);
    },
    deleteCategory: (categoryId)=> {
        const url = `/category/delete-category/${categoryId}`;
        return axiosConfig.delete(url);
    }
}

export default categoryApi;