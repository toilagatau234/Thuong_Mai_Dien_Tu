import React, { useState, useEffect } from 'react';
import { getApi, postApi, deleteApi } from '../../services/apiService';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Hàm tải danh mục
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getApi('/category/getAll'); // Thay URL API
      if (response.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      }
    } catch (err) {
      setError('Không thể tải danh mục.');
    } finally {
      setLoading(false);
    }
  };

  // 2. useEffect để tải khi vào trang
  useEffect(() => {
    fetchCategories();
  }, []);

  // 3. Hàm thêm danh mục
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategoryName) return;
    try {
      await postApi('/category/add', { name: newCategoryName }); // Thay URL API
      setNewCategoryName(''); // Xóa ô input
      fetchCategories(); // Tải lại danh sách
    } catch (err) {
      alert('Thêm thất bại');
    }
  };

  // 4. Hàm xóa danh mục
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await deleteApi(`/category/delete/${id}`); // Thay URL API
        fetchCategories(); // Tải lại danh sách
      } catch (err) {
        alert('Xóa thất bại');
      }
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  
  // 5. Copy HTML từ category.html
  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Danh mục</h3>
          </div>
        </div>
      </div>

      {/* Form thêm mới */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleAdd}>
                <div className="row">
                  <div className="col-md-10">
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Nhập tên danh mục mới..."
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">Thêm</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên danh mục</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => (
                      <tr key={cat.id}>
                        <td>{cat.id}</td>
                        <td>{cat.name}</td>
                        <td>
                          {/* (Thêm nút sửa ở đây) */}
                          <button 
                            onClick={() => handleDelete(cat.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;