import React, { useState, useEffect, useCallback } from 'react';
import apiService from '../../services/apiService';
import { toast } from 'react-hot-toast';
import Switch from 'react-switch'; // Thay thế Switchery
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Số lượng item mỗi trang

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null); // Lưu trữ { _id, name } khi sửa
  const [categoryName, setCategoryName] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Hàm gọi API lấy danh mục (sử dụng useCallback để tối ưu)
  const fetchCategories = useCallback(async (page, search = '') => {
    try {
      setLoading(true);
      const params = {
        page: page,
        limit: limit,
        search: search,
      };
      // API endpoint: /categories?page=1&limit=10&search=ao
      const response = await apiService.get('/categories', { params });
      
      setCategories(response.data.categories || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
      
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Không thể tải danh mục.');
    } finally {
      setLoading(false);
    }
  }, [limit]); // dependency 'limit' là hằng số

  // Lấy dữ liệu khi component mount hoặc khi page, search thay đổi
  useEffect(() => {
    fetchCategories(currentPage, searchTerm);
  }, [fetchCategories, currentPage, searchTerm]);

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xử lý thay đổi search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi search
  };

  // --- Xử lý Modal ---

  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentCategory(null);
    setCategoryName('');
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setIsEditMode(true);
    setCurrentCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Hàm reset state sẽ được gọi bởi listener 'hidden.bs.modal' trong Modal component
  };
  
  // Hàm này được truyền vào Modal component,
  // được gọi khi modal đã đóng hoàn toàn
  const onModalClose = () => {
    setCategoryName('');
    setIsEditMode(false);
    setCurrentCategory(null);
    setFormLoading(false);
  };

  // Xử lý Submit (Thêm/Sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      toast.error('Tên danh mục không được để trống.');
      return;
    }

    setFormLoading(true);
    const payload = { name: categoryName };

    try {
      if (isEditMode && currentCategory) {
        // Chế độ Sửa
        await apiService.put(`/categories/${currentCategory._id}`, payload);
        toast.success('Cập nhật danh mục thành công!');
      } else {
        // Chế độ Thêm
        await apiService.post('/categories', payload);
        toast.success('Thêm danh mục thành công!');
      }
      
      closeModal();
      // Tải lại danh sách (trang hiện tại)
      fetchCategories(currentPage, searchTerm);

    } catch (error) {
      console.error('Failed to save category:', error);
      // Lỗi đã được toast bởi interceptor
    } finally {
      setFormLoading(false);
    }
  };

  // --- Xử lý Actions ---

  // Thay đổi trạng thái (Toggle Status)
  const handleToggleStatus = async (category) => {
    const newStatus = !category.status;
    const toastId = toast.loading('Đang cập nhật trạng thái...');

    try {
      await apiService.put(`/categories/toggle-status/${category._id}`, { status: newStatus });
      toast.success('Cập nhật trạng thái thành công!', { id: toastId });
      
      // Cập nhật state ngay lập tức để UI phản hồi
      setCategories(categories.map(cat =>
        cat._id === category._id ? { ...cat, status: newStatus } : cat
      ));
    } catch (error) {
      console.error('Failed to toggle status:', error);
      toast.error('Cập nhật thất bại.', { id: toastId });
    }
  };

  // Xử lý Xóa (Delete)
  const handleDelete = (category) => {
    // Sử dụng react-hot-toast để xác nhận
    toast((t) => (
      <span>
        Bạn có chắc muốn xóa <b>{category.name}</b>?
        <button
          className="btn btn-danger btn-sm ms-2"
          onClick={() => {
            confirmDelete(category._id);
            toast.dismiss(t.id);
          }}
        >
          Xóa
        </button>
        <button
          className="btn btn-secondary btn-sm ms-1"
          onClick={() => toast.dismiss(t.id)}
        >
          Hủy
        </button>
      </span>
    ), { duration: 6000 });
  };

  const confirmDelete = async (id) => {
    const toastId = toast.loading('Đang xóa...');
    try {
      await apiService.delete(`/categories/${id}`);
      toast.success('Xóa danh mục thành công!', { id: toastId });
      // Tải lại danh sách
      fetchCategories(currentPage, searchTerm);
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Xóa thất bại.', { id: toastId });
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Categories</h3>
          </div>
          <div className="col-auto text-end">
            <button
              className="btn btn-primary"
              onClick={openAddModal}
            >
              <i className="fas fa-plus"></i> Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Thanh Search */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input 
            type="text"
            className="form-control"
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Bảng Danh mục */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : categories.length > 0 ? (
                      categories.map((category) => (
                        <tr key={category._id}>
                          <td>{category._id}</td>
                          <td>{category.name}</td>
                          <td>
                            <Switch
                              onChange={() => handleToggleStatus(category)}
                              checked={category.status}
                              onColor="#00D285" // Màu xanh lá giống Switchery
                              onHandleColor="#ffffff"
                              handleDiameter={20}
                              uncheckedIcon={false}
                              checkedIcon={false}
                              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                              height={15}
                              width={35}
                              className="react-switch"
                            />
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => openEditModal(category)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(category)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Phân trang */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal Thêm/Sửa */}
      <Modal
        id="categoryModal"
        title={isEditMode ? 'Edit Category' : 'Add New Category'}
        show={showModal}
        onClose={closeModal} // Yêu cầu đóng modal
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal} // Yêu cầu đóng
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={formLoading}
            >
              {formLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Save'
              )}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CategoryPage;