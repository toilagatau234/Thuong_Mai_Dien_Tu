import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductDetail, updateProduct, getAllCategories } from '../../services/apiService';

const ProductEditPage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    categoryId: '',
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tải dữ liệu danh mục VÀ chi tiết sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Tải danh mục
        const catResponse = await getAllCategories(); // Dùng hàm API
        if (catResponse.data && Array.isArray(catResponse.data.data)) {
          setCategories(catResponse.data.data);
        }
        
        // Tải chi tiết sản phẩm
        const prodResponse = await getProductDetail(id); // Dùng hàm API
        if (prodResponse.data) {
          // Gán dữ liệu vào state
          setProduct({
            name: prodResponse.data.name,
            price: prodResponse.data.price,
            quantity: prodResponse.data.quantity,
            description: prodResponse.data.description || '',
            categoryId: prodResponse.data.category_id, // Đảm bảo key này đúng
          });
        } else {
          setError('Không tìm thấy sản phẩm.');
        }
      } catch (err) {
        setError('Không thể tải dữ liệu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Hàm cập nhật state khi gõ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Hàm submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError(null);
    try {
      await updateProduct(id, product); // Dùng hàm API
      alert('Cập nhật sản phẩm thành công!');
      navigate('/admin/product');
    } catch (err) {
      setError('Cập nhật thất bại: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };
  
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Cập nhật Sản phẩm</h3>
          </div>
          <div className="col-auto text-right">
            <Link to="/admin/product" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Quay lại
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tên sản phẩm</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
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
                
                {/* (Thêm input upload ảnh) */}

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-right">
                  <button type="submit" className="btn btn-primary" disabled={saveLoading}>
                    {saveLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
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

export default ProductEditPage;