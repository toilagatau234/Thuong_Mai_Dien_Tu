const Product = require('../models/Product.js');
const Category = require('../models/Category.js');
const Brand = require('../models/Brand.js'); 

const getAllProducts = async (req, res) => {
    try {
        // === ĐỌC TẤT CẢ QUERY PARAMS VÀ XỬ LÝ PHÂN TRANG ===
        const { search, category, brand, rating, price_from, price_to, page, limit } = req.query;
        
        const currentPage = Number(page) || 1;
        const pageSize = Number(limit) || 10;
        const skipCount = (currentPage - 1) * pageSize;

        let pipeline = []; 
        let matchStage = {}; // Dùng một $match duy nhất cho các điều kiện đơn giản

        // === LỌC THEO TÌM KIẾM (Tên sản phẩm) ===
        if (search) {
            matchStage.name = { $regex: search, $options: 'i' }; // 'i' = không phân biệt hoa thường
        }
        
        // === LỌC THEO ĐÁNH GIÁ ===
        if (rating) {
            matchStage['reviewSummary.averageRating'] = { $gte: Number(rating) };
        }

        // === LỌC THEO CATEGORY (Cần lookup) ===
        if (category) {
            const categoryDoc = await Category.findOne({ name: { $regex: new RegExp(`^${category}$`, 'i') } });
            
            if (categoryDoc) {
                matchStage.category = categoryDoc._id; // So sánh ObjectId
            } else {
                // Nếu category không tồn tại, trả về kết quả rỗng (không cần gọi tiếp DB)
                return res.status(200).json({ message: 'OK', data: [], total: 0 });
            }
        }
        
        // === LỌC THEO BRAND (Cần lookup) ===
        if (brand) {
            const brandsToFilter = Array.isArray(brand) ? brand : [brand];

            console.log("Tên thương hiệu cần tìm:", brandsToFilter);

            const brandDocs = await Brand.find({ 
                name: { $in: brandsToFilter.map(b => new RegExp(`^${b}$`, 'i')) } 
            });
            
            if (brandDocs.length > 0) {
                const brandIds = brandDocs.map(b => b._id);
                
                console.log("IDs Thương hiệu tìm thấy:", brandIds);

                matchStage.brand = { $in: brandIds };
            } else {
                return res.status(200).json({ message: 'OK', data: [], total: 0 });
            }
        }
        
        // --- THÊM $MATCH VÀO PIPELINE ---
        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }
        
        // === LỌC THEO KHOẢNG GIÁ (Cần $match phức tạp hơn cho Variations) ===
        if (price_from || price_to) {
            let priceFilter = {};
            if (price_from) priceFilter['$gte'] = Number(price_from);
            if (price_to) priceFilter['$lte'] = Number(price_to);
            
            // Thêm điều kiện $match cho giá của variations[0].price
            pipeline.push({
                $match: { 
                    "variations": { $exists: true, $ne: [] }, // variations phải tồn tại VÀ không rỗng
                    'variations.0.price': priceFilter // Lọc theo giá của biến thể đầu tiên
                }
            });
        }

        // === TÍNH TỔNG SẢN PHẨM TRƯỚC PHÂN TRANG ===
        const totalProducts = await Product.aggregate([...pipeline, { $count: 'total' }]);
        const total = totalProducts.length > 0 ? totalProducts[0].total : 0;
        
        // === THÊM PHÂN TRANG VÀO PIPELINE ===
        pipeline.push({ $skip: skipCount });
        pipeline.push({ $limit: pageSize });

        // === THỰC THI FINAL PIPELINE ===
        const products = await Product.aggregate(pipeline); 

        res.status(200).json({
            message: 'Lấy sản phẩm thành công',
            data: products,
            total: total, // Gửi tổng số lượng cho Frontend
            currentPage: currentPage,
            pageSize: pageSize
        });
    } catch (error) {
        console.error("Lỗi khi lấy tất cả sản phẩm:", error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const getProductDetails = async (req, res) => {
    // Giữ nguyên hàm này, nó đã đúng
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json({
            message: 'Lấy chi tiết sản phẩm thành công',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    getAllProducts,
    getProductDetails
};