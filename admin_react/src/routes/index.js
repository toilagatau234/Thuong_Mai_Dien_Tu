// Import tất cả các trang
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import ProductAddPage from '../pages/ProductAddPage/ProductAddPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import OrderDetailPage from '../pages/Order/OrderDetailPage';
import UserPage from '../pages/UserPage/UserPage';
import UserAddPage from '../pages/User/UserAddPage';
import UserEditPage from '../pages/User/UserEditPage';
import CouponPage from '../pages/CouponPage/CouponPage';
import FeedbackPage from '../pages/FeedbackPage/FeedbackPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

// Định nghĩa các tuyến đường
export const routes = [
  // --- Trang không cần đăng nhập ---
  {
    path: '/login',
    page: LoginPage,
    isShowHeader: false, // Không hiển thị Header/Sidebar
    isPrivate: false,     // Không cần đăng nhập
  },

  // --- Các trang cần đăng nhập ---
  {
    path: '/admin/dashboard',
    page: DashboardPage,
    isShowHeader: true, // Hiển thị Header/Sidebar
    isPrivate: true,    // Cần đăng nhập
  },
  {
    path: '/admin/category',
    page: CategoryPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/product',
    page: ProductPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/product/add',
    page: ProductAddPage,
    isShowHeader: true,
    isPrivate: true,
  },
  // Thêm route cho Sửa sản phẩm (ví dụ)
  // {
  //   path: '/admin/product/edit/:id',
  //   page: ProductEditPage, // Bạn sẽ cần tạo trang này
  //   isShowHeader: true,
  //   isPrivate: true,
  // },
  {
    path: '/admin/order',
    page: OrderPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/order/detail/:id',
    page: OrderDetailPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/user',
    page: UserPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/user/add',
    page: UserAddPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/user/edit/:id',
    page: UserEditPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/coupon',
    page: CouponPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/feedback',
    page: FeedbackPage,
    isShowHeader: true,
    isPrivate: true,
  },

  // --- Điều hướng mặc định ---
  {
    path: '/',
    page: () => <Navigate to="/admin/dashboard" replace />, // Tự động chuyển / sang /admin/dashboard
    isShowHeader: false,
    isPrivate: true, // Cần đăng nhập để được chuyển hướng
  },
  {
    path: '/admin',
    page: () => <Navigate to="/admin/dashboard" replace />, // Tự động chuyển /admin sang /admin/dashboard
    isShowHeader: false,
    isPrivate: true,
  },

  // --- Trang 404 ---
  {
    path: '*', // Bất kỳ đường dẫn nào không khớp
    page: NotFoundPage,
    isShowHeader: false,
    isPrivate: false,
  },
];

// Hàm giúp điều hướng (tạm thời chưa dùng)
const Navigate = ({ to }) => {
  const navigate = require('react-router-dom').useNavigate();
  React.useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
};