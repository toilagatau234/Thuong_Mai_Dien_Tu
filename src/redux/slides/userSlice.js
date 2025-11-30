import { createSlice } from '@reduxjs/toolkit';

// --- BƯỚC 1: Thử lấy dữ liệu từ LocalStorage khi App vừa chạy ---
const getInitialUser = () => {
    try {
        const user = localStorage.getItem('user'); // Giả sử bạn lưu key là 'user' khi login
        return user ? JSON.parse(user) : null;
    } catch (error) {
        return null;
    }
};

const initialState = {
  currentUser: getInitialUser(), // <--- SỬA DÒNG NÀY (Thay vì để null)
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = false;
      
      // --- BƯỚC 2: Khi Login thành công, nhớ lưu vào LocalStorage ---
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = false;
      
      // --- BƯỚC 3: Khi Logout, nhớ xóa khỏi LocalStorage ---
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('userId');
    },
    updateUser: (state, action) => {
      // Cập nhật Redux
      const updatedUser = { ...state.currentUser, ...action.payload };
      state.currentUser = updatedUser;
      
      // --- BƯỚC 4: Cập nhật luôn vào LocalStorage để F5 không bị mất dữ liệu mới ---
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },
});

export const { loginSuccess, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;