import React, { useState, useEffect } from 'react';
import { getApi, postApi, deleteApi } from '../../services/apiService';

const FeedbackPage = () => {
  // --- State cho Danh sách Phản hồi ---
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- State cho Modal Trả lời ---
  const [selectedFeedback, setSelectedFeedback] = useState(null); // Feedback đang được chọn
  const [replyText, setReplyText] = useState(''); // Nội dung trả lời
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // 1. Hàm tải danh sách phản hồi (từ feedback.html)
  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);
    try {
      // GHI CHÚ: Thay thế URL API nếu cần
      const response = await getApi('/feedback/getAll');
      if (response.data && Array.isArray(response.data.data)) {
        setFeedbacks(response.data.data);
      } else {
        setFeedbacks([]);
      }
    } catch (err) {
      setError('Không thể tải danh sách phản hồi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 2. useEffect để tải danh sách khi vào trang
  useEffect(() => {
    fetchFeedbacks();
  }, []); // [] rỗng nghĩa là chỉ chạy 1 lần

  // 3. Hàm xóa phản hồi (từ feedback.html)
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
      try {
        // GHI CHÚ: Thay thế URL API nếu cần
        await deleteApi(`/feedback/delete/${id}`);
        alert('Xóa thành công!');
        fetchFeedbacks(); // Tải lại danh sách
      } catch (err) {
        alert('Xóa thất bại!');
        console.error(err);
      }
    }
  };

  // 4. Các hàm xử lý Modal (từ feedback-detail.html)
  const handleOpenModal = (feedback) => {
    // GHI CHÚ: Có thể bạn muốn gọi API getApi('/feedback/detail/...')
    // để lấy chi tiết, nhưng ở đây ta dùng luôn data từ list
    setSelectedFeedback(feedback);
    setReplyText(''); // Xóa text trả lời cũ
    setModalError(null);
  };

  const handleCloseModal = () => {
    setSelectedFeedback(null);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError(null);
    try {
      // GHI CHÚ: Thay thế URL API nếu cần
      const replyData = {
        feedback_id: selectedFeedback.id,
        content: replyText,
        // (Thêm admin_id nếu API yêu cầu)
      };
      await postApi('/feedback/reply', replyData); // Giả sử URL API là vầy

      alert('Trả lời thành công!');
      handleCloseModal();
      fetchFeedbacks(); // Tải lại list (có thể để cập nhật trạng thái "Đã trả lời")

    } catch (err) {
      setModalError('Gửi trả lời thất bại: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };


  // --- Helper Functions (Hàm hỗ trợ) ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Hàm render sao đánh giá
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fas fa-star"
          style={{ color: i <= rating ? '#ffc107' : '#e0e0e0' }}
        ></i>
      );
    }
    return stars;
  };
  

  // 7. Render JSX
  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Quản lý Phản hồi</h3>
          </div>
        </div>
      </div>

      {/* ===== PHẦN 1: DANH SÁCH PHẢN HỒI (từ feedback.html) ===== */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Tất cả phản hồi</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Người dùng</th>
                      <th>Sản phẩm</th>
                      <th>Đánh giá</th>
                      <th>Bình luận</th>
                      <th>Ngày</th>
                      <th>Trạng thái</th>
                      <th className="text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Hiển thị loading */}
                    {loading && (
                      <tr>
                        <td colSpan="8" className="text-center">Đang tải...</td>
                      </tr>
                    )}
                    
                    {/* Hiển thị lỗi */}
                    {error && (
                      <tr>
                        <td colSpan="8" className="text-center text-danger">{error}</td>
                      </tr>
                    )}

                    {/* Hiển thị dữ liệu */}
                    {!loading && !error && feedbacks.map((fb) => (
                      <tr key={fb.id}>
                        <td>{fb.id}</td>
                        <td>{fb.user?.name || 'N/A'}</td> {/* Giả sử API trả về user.name */}
                        <td>{fb.product?.name || 'N/A'}</td> {/* Giả sử API trả về product.name */}
                        <td>{renderRating(fb.rating)}</td>
                        <td style={{ maxWidth: '300px' }}>{fb.comment}</td>
                        <td>{formatDate(fb.created_at)}</td>
                        <td>
                          {/* (Logic hiển thị trạng thái) */}
                          {fb.is_replied ? (
                            <span className="badge badge-success">Đã trả lời</span>
                          ) : (
                            <span className="badge badge-warning">Chưa trả lời</span>
                          )}
                        </td>
                        <td className="text-right">
                          <button
                            onClick={() => handleOpenModal(fb)}
                            className="btn btn-sm btn-info me-2"
                            data-bs-toggle="modal" // Thêm thuộc tính Bootstrap
                            data-bs-target="#feedbackModal" // Thêm thuộc tính Bootstrap
                          >
                            Trả lời
                          </button>
                          <button
                            onClick={() => handleDelete(fb.id)}
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

      {/* ===== PHẦN 2: MODAL TRẢ LỜI (từ feedback-detail.html) ===== */}
      {/* Chúng ta dùng state `selectedFeedback` để điều khiển modal này.
        Chúng ta cũng thêm các thuộc tính `data-bs-toggle` và `data-bs-target`
        vào nút "Trả lời" ở trên để Bootstrap JS có thể nhận diện.
        
        Tuy nhiên, cách tốt nhất trong React là kiểm soát hoàn toàn
        việc hiển thị modal bằng state.
      */}
      <div 
        className={`modal fade ${selectedFeedback ? 'show' : ''}`} 
        id="feedbackModal" 
        tabIndex="-1" 
        style={{ display: selectedFeedback ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            
            {/* Kiểm tra nếu có feedback được chọn mới render nội dung */}
            {selectedFeedback && (
              <form onSubmit={handleSubmitReply}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    Trả lời phản hồi của: {selectedFeedback.user?.name || 'N/A'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                
                <div className="modal-body">
                  <div className="mb-3">
                    <strong>Sản phẩm:</strong> {selectedFeedback.product?.name || 'N/A'}
                  </div>
                  <div className="mb-3">
                    <strong>Đánh giá:</strong> {renderRating(selectedFeedback.rating)}
                  </div>
                  <div className="mb-3">
                    <strong>Bình luận của khách:</strong>
                    <p className="text-muted border p-2 rounded">{selectedFeedback.comment}</p>
                  </div>
                  
                  <hr />
                  
                  {/* Đây là form trả lời từ feedback-detail.html */}
                  <div className="form-group">
                    <label htmlFor="replyText" className="form-label">Nội dung trả lời của bạn:</label>
                    <textarea 
                      id="replyText"
                      className="form-control" 
                      rows="4"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Nhập nội dung trả lời..."
                      required
                    ></textarea>
                  </div>
                  
                  {/* Hiển thị lỗi nếu có */}
                  {modalError && <div className="alert alert-danger">{modalError}</div>}

                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleCloseModal}
                  >
                    Đóng
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={modalLoading}
                  >
                    {modalLoading ? 'Đang gửi...' : 'Gửi trả lời'}
                  </button>
                </div>
              </form>
            )}
            
          </div>
        </div>
      </div>
      
      {/* Lớp mờ (Backdrop) cho modal */}
      {selectedFeedback && <div className="modal-backdrop fade show"></div>}

    </div>
  );
};

export default FeedbackPage;