import axios from 'axios';
import Cookies from 'js-cookie';

// Thay thế URL này bằng URL API backend
const API_BASE_URL = 'http://localhost:8081/api/';

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

// Response interceptor để xử lý lỗi
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi 401 (Unauthorized) hoặc 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      // Chuyển hướng về trang login
      window.location.href = '/login';
    } else {
      // Hiển thị lỗi chung
      const message = error.response?.data?.message || error.message || 'Có lỗi xảy ra';
      toast.error(message);
    }
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
export const getAllProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/product/getAll${query ? '?' + query : ''}`);
};

export const getProductDetail = (id) => {
  return apiClient.get(`/product/${id}`);
};

export const addProduct = (productData) => {
  // productData là FormData chứa { name, price, image, ... }
  return apiClient.post('/product/add', productData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const updateProduct = (id, productData) => {
  return apiClient.put(`/product/update/${id}`, productData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteProduct = (id) => {
  return apiClient.delete(`/product/delete/${id}`);
};

// Category
export const getAllCategories = () => {
  return apiClient.get('/category/getAll');
};

export const addCategory = (categoryData) => {
  return apiClient.post('/category/add', categoryData);
};

export const deleteCategory = (id) => {
  return apiClient.delete(`/category/delete/${id}`);
};

// Order (using 'bill' to match AngularJS)
export const getAllOrders = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/bill/getAll${query ? '?' + query : ''}`);
};

export const getOrderDetail = (id) => {
  return apiClient.get(`/bill/detail/${id}`);
};

export const updateOrderStatus = (id, statusData) => {
  return apiClient.put(`/bill/status/${id}`, statusData);
};

// User
export const getAllUsers = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/user/getAll${query ? '?' + query : ''}`);
};

export const getUserDetail = (id) => {
  return apiClient.get(`/user/detail/${id}`);
};

export const addUser = (userData) => {
  return apiClient.post('/user/add', userData);
};

export const updateUser = (id, userData) => {
  return apiClient.put(`/user/update/${id}`, userData);
};

export const deleteUser = (id) => {
  return apiClient.delete(`/user/delete/${id}`);
};

export const blockUser = (id) => {
  return apiClient.put(`/user/block/${id}`);
};

export const unblockUser = (id) => {
  return apiClient.put(`/user/unblock/${id}`);
};

// Coupon
export const getAllCoupons = () => {
  return apiClient.get('/coupon/getAll');
};

export const addCoupon = (couponData) => {
  return apiClient.post('/coupon/add', couponData);
};

export const deleteCoupon = (id) => {
  return apiClient.delete(`/coupon/delete/${id}`);
};

// Feedback
export const getAllFeedbacks = () => {
  return apiClient.get('/feedback/getAll');
};

export const getFeedbackDetail = (id) => {
  return apiClient.get(`/feedback/detail/${id}`);
};
