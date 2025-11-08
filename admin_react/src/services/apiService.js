import axios from 'axios';
import Cookies from 'js-cookie';

// Thay thế URL này bằng URL API backend
const API_BASE_URL = 'http://localhost:3000/api/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// "interceptor" - tự động đính kèm token vào mỗi request
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Định nghĩa các hàm gọi API ---

// --- Các API gọi chung ---

// Hàm đăng nhập
export const loginAdmin = (credentials) => {
  return apiClient.post('/admin/login', credentials);
};

// Hàm lấy dữ liệu
export const getApi = (url) => {
  return apiClient.get(url);
};

// Hàm đăng dữ liệu
export const postApi = (url, data) => {
  return apiClient.post(url, data);
};

// Hàm cập nhật dữ liệu
export const putApi = (url, data) => {
  return apiClient.put(url, data);
};

// Hàm xóa dữ liệu
export const deleteApi = (url) => {
  return apiClient.delete(url);
};

// --- API cụ thể từng trang ---

// Product 
export const getAllProducts = () => {
  return apiClient.get('/product/getAll'); // Đổi API
};

export const deleteProduct = (id) => {
  return apiClient.delete(`/product/delete/${id}`);
};

export const addProduct = (productData) => {
  // productData là object chứa { name, price, ... }
  // Thêm phần xử lý upload ảnh
  return apiClient.post('/product/add', productData); 
};


// Category
export const getAllCategories = () => {
  return apiClient.get('/category/getAll');
}

export const addCategory = (categoryData) => {
  return apiClient.post('/category/add', categoryData);
}

export const deleteCategory = (id) => {
  return apiClient.delete(`/category/delete/${id}`);
}

// ... (thêm các hàm cho User, Order, Coupon và các hàm mới)