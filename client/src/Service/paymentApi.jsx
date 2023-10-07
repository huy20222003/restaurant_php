import axiosConfig from "./axiosConfig";

const paymentApi = {
    getAll: ()=> {
        const url = '/payment';
        return axiosConfig.get(url);
    },
}

export default paymentApi;