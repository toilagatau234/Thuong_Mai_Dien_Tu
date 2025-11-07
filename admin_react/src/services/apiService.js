import axios from 'axios';
import Cookies from 'js-cookie';

// GHI CHÚ: Thay thế URL này bằng URL API backend của bạn
const API_BASE_URL = 'http://localhost:3000/api/v1'; // Ví dụ

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Đây là "interceptor" - nó sẽ tự động đính kèm token vào *mỗi* request
// Giống hệt chức năng bạn làm trong AngularJS
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

// Hàm đăng nhập
export const loginAdmin = (credentials) => {
  // credentials là một object { email, password }
  return apiClient.post('/admin/login', credentials);
};

// Hàm lấy dữ liệu (thay thế hàm get() cũ)
export const getApi = (url) => {
  return apiClient.get(url);
};

// Hàm đăng dữ liệu (thay thế hàm post() cũ)
export const postApi = (url, data) => {
  return apiClient.post(url, data);
};

// Hàm cập nhật dữ liệu (thay thế hàm put() cũ)
export const putApi = (url, data) => {
  return apiClient.put(url, data);
};

// Hàm xóa dữ liệu (thay thế hàm delete() cũ)
export const deleteApi = (url) => {
  return apiClient.delete(url);
};

// Bạn cũng có thể định nghĩa các hàm cụ thể hơn
// Ví dụ cho trang Sản phẩm
export const getAllProducts = () => {
  return apiClient.get('/product/getAll'); // Giả sử URL API là vậy
};

export const deleteProduct = (id) => {
  return apiClient.delete(`/product/delete/${id}`);
};

export const addProduct = (productData) => {
  // productData là object chứa { name, price, ... }
  // Lưu ý: Tệp `file.js` cũ của bạn xử lý upload ảnh.
  // Trong React, bạn sẽ dùng FormData. Tạm thời hàm này cho dữ liệu text.
  return apiClient.post('/product/add', productData); 
};

// Ví dụ cho trang Danh mục
export const getAllCategories = () => {
  return apiClient.get('/category/getAll');
}

export const addCategory = (categoryData) => {
  return apiClient.post('/category/add', categoryData);
}

export const deleteCategory = (id) => {
  return apiClient.delete(`/category/delete/${id}`);
}

// ... (Bạn tự thêm các hàm cho User, Order, Coupon... theo mẫu trên)