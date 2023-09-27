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
    updateCategory: (categoryId, data)=> {
        const url = `/category/update-category/${categoryId}`;
        return axiosConfig.put(url, data);
    },
    deleteCategory: (categoryId)=> {
        const url = `/category/delete-category/${categoryId}`;
        return axiosConfig.delete(url);
    },
    addProductToCategory: (data)=> {
        const url = '/category/add-product';
        return axiosConfig.patch(url, data);
    }
}

export default categoryApi;