import axios from 'axios';
import Cookies from 'js-cookie';


const axiosConfig = axios.create({
  baseURL: 'https://restaurant-vh35.onrender.com/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept request và thêm token vào tiêu đề
// Intercept request và thêm token vào tiêu đề
axiosConfig.interceptors.request.use((config) => {
  const token = Cookies.get('user');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get('refresh');
      if (refreshToken) {
        let response;
        // try {
        //   const refreshData = {refreshToken}
        //   if(!window.location.href.includes('admin')) {
        //     response = await axiosConfig.post('/auth/refresh',  refreshData );
        //   } else {
        //     response = await axiosConfig.post('/auth/admin/refresh',  refreshData );
        //   }
        //   const newToken = response.data.accessToken;

        //   // Lưu token mới vào cookie
        //   const expiration = new Date();
        //   expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
        //   Cookies.set('user', newToken, {
        //     expires: expiration,
        //   });

        //   // Thực hiện lại yêu cầu gốc với token mới (nếu có)
        //   error.config.headers.Authorization = `Bearer ${newToken}`;
        //   return axios.request(error.config);
        // } catch (refreshError) {
        //   console.error('Lỗi khi làm mới token:', refreshError);
        //   window.location.href = '/auth/login'; 
        // }
      } else {
        Cookies.remove('user');
        Cookies.remove('refresh');
        
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);


export default axiosConfig;
