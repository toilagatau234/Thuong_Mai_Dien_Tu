import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api'; // Thay đổi URL nếu cần

const api = axios.create({
    baseURL: API_URL,
});

// Thêm interceptor để tự động thêm token vào header của mỗi request
api.interceptors.request.use((config => {
    const token = Cookies.get('admin_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}));

export default api;