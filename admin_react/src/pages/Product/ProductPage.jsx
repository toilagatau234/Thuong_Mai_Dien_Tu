import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApi, deleteApi } from '../../services/apiService'; // Dùng hàm chung

const ProductPage = () => {
  // Dùng useState để lưu danh sách sản phẩm
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Hàm tải dữ liệu
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Thay thế URL API
      const response = await getApi('/product/getAll'); // Thêm ?page=... nếu phân trang

      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
        // setTotalPages(Math.ceil(response.data.total / 10)); // 10 là limit
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Dùng useEffect để gọi hàm fetchProducts khi trang tải
  useEffect(() => {
    fetchProducts();
  }, []); 

  // Hàm xử lý xóa
  const handleDelete = async (id) => {
    // Xác nhận trước khi xóa
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        // Thay thế URL API
        await deleteApi(`/product/delete/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Xóa sản phẩm thất bại!');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      {/* Header của trang */}
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Sản phẩm</h3>
          </div>
          <div className="col-auto text-right">
            <Link to="/admin/product/add" className="btn btn-primary">
              <i className="fas fa-plus"></i> Thêm sản phẩm
            </Link>
          </div>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Danh mục</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      // 'key' là bắt buộc trong React
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                          {/* Sửa đường dẫn ảnh nếu cần */}
                          <img 
                            src={product.image || '/assets/img/logo.png'} 
                            alt={product.name} 
                            width="50" 
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category?.name || 'N/A'}</td>
                        <td>{product.price?.toLocaleString('vi-VN')}đ</td>
                        <td>{product.quantity}</td>
                        <td>
                          <Link 
                            to={`/admin/product/edit/${product.id}`} // Link đến trang sửa
                            className="btn btn-sm btn-warning me-2"
                          >
                            Sửa
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
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
          
          {/* (Thêm code phân trang) */}

        </div>
      </div>
    </div>
  );
};

export default ProductPage;