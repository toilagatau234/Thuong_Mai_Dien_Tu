import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi, getApi } from '../../services/apiService';

const ProductAddPage = () => {
  // 1. Dùng 1 state object để lưu tất cả dữ liệu form
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    categoryId: '',
    // Thêm các trường khác...
  });
  
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // (Thêm state cho upload ảnh)
  // const [selectedImage, setSelectedImage] = useState(null); 
  
  const navigate = useNavigate();

  // 2. Tải danh mục cho thẻ <select>
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getApi('/category/getAll'); // Thay URL API
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        }
      } catch (err) {
        console.error("Không thể tải danh mục", err);
      }
    };
    fetchCategories();
  }, []);

  // 3. Hàm cập nhật state khi gõ vào input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };
  
  // (Hàm xử lý khi chọn ảnh)
  // const handleImageChange = (e) => {
  //   setSelectedImage(e.target.files[0]);
  // };

  // 4. Hàm submit form (thay thế $scope.addProduct)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // GHI CHÚ: Xử lý upload ảnh phức tạp hơn
    // Bạn cần dùng FormData nếu có upload ảnh
    // Tạm thời, chúng ta chỉ gửi dữ liệu text
    
    try {
      // Thay thế URL API
      await postApi('/product/add', product);
      
      alert('Thêm sản phẩm thành công!');
      navigate('/admin/product'); // Quay về trang danh sách

    } catch (err) {
      setError('Thêm sản phẩm thất bại. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Thêm Sản phẩm mới</h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {/* 5. Chuyển đổi form */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tên sản phẩm</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name" // name phải khớp với key trong state
                        value={product.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Danh mục</label>
                      <select
                        className="form-control"
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Giá</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Số lượng</label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                {/* (Thêm input upload ảnh ở đây) */}
                {/* <div className="form-group">
                  <label>Hình ảnh</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    onChange={handleImageChange} 
                  />
                </div>
                */}

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-right">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddPage;