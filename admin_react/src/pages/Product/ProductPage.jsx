import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApi, deleteApi } from '../../services/apiService'; // Dùng hàm chung

const ProductPage = () => {
  // 1. Dùng useState để lưu danh sách sản phẩm
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // (Bạn có thể thêm state cho phân trang giống controller cũ)
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  // 2. Hàm tải dữ liệu
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // GHI CHÚ: Thay thế URL API
      const response = await getApi('/product/getAll'); // Thêm ?page=... nếu phân trang

      // Giả sử API trả về { data: [...], total: ... }
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

  // 3. Dùng useEffect để gọi hàm fetchProducts khi trang tải
  useEffect(() => {
    fetchProducts();
  }, []); // [] rỗng nghĩa là chỉ chạy 1 lần

  // 4. Hàm xử lý xóa (thay thế $scope.deleteProduct)
  const handleDelete = async (id) => {
    // Xác nhận trước khi xóa
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        // GHI CHÚ: Thay thế URL API
        await deleteApi(`/product/delete/${id}`);
        
        // Tải lại danh sách sản phẩm sau khi xóa
        // Cách 1: Gọi lại API
        fetchProducts(); 
        
        // Cách 2: Xóa khỏi state (nhanh hơn)
        // setProducts(products.filter(p => p.id !== id));

      } catch (err) {
        alert('Xóa sản phẩm thất bại!');
        console.error(err);
      }
    }
  };

  // 5. Render giao diện
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
            {/* GHI CHÚ: dùng <Link> của React Router */}
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
                    {/* GHI CHÚ: ng-repeat -> .map() */}
                    {products.map((product) => (
                      // 'key' là bắt buộc trong React
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                          {/* Sửa đường dẫn ảnh nếu cần */}
                          <img 
                            src={product.image || '/assets/img/logo2.png'} 
                            alt={product.name} 
                            width="50" 
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category?.name || 'N/A'}</td> {/* Giả sử có product.category.name */}
                        <td>{product.price?.toLocaleString('vi-VN')}đ</td>
                        <td>{product.quantity}</td>
                        <td>
                          <Link 
                            to={`/admin/product/edit/${product.id}`} // Link đến trang sửa
                            className="btn btn-sm btn-warning me-2"
                          >
                            Sửa
                          </Link>
                          {/* GHI CHÚ: ng-click -> onClick */}
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
          
          {/* (Thêm code phân trang của bạn ở đây nếu có) */}

        </div>
      </div>
    </div>
  );
};

export default ProductPage;