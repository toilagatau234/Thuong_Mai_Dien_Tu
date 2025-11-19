import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        // Lấy token trực tiếp từ localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Xử lý lỗi 401
        if (error.response && error.response.status === 401) {
            console.error("Token không hợp lệ hoặc đã hết hạn.");
            // Ví dụ xử lý logout:
            // localStorage.clear();
            // window.location.href = '/sign-in';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
