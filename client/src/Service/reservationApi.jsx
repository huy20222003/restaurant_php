import axiosConfig from './axiosConfig';

const reservationApi = {
    getReservation: ()=> {
        const url = '/reservation';
        return axiosConfig.get(url);
    },
    createTable: (data)=> {
        const url = '/reservation/create-table';
        return axiosConfig.post(url, data);
    },
    createReservation: (data)=> {
        const url = '/reservation/create-reservation';
        return axiosConfig.post(url, data);
    },
}

export default reservationApi;