const Product = require('../models/Product.js');
const Category = require('../models/Category.js');
const Brand = require('../models/Brand.js');
const fs = require('fs');
const path = require('path');

// --- LẤY TẤT CẢ SẢN PHẨM, CÓ FILTER & PAGINATION ---
const getAllProducts = async (req, res) => {
  try {
    const {
      search,       // từ khóa tìm kiếm
      category,     // lọc theo danh mục
      brand,        // lọc theo thương hiệu
      rating,       // lọc theo đánh giá trung bình
      price_from,   // lọc giá từ
      price_to,     // lọc giá đến
      page,         // trang hiện tại
      limit         // số sản phẩm/trang
    } = req.query;

    const currentPage = Number(page) || 1;
    const pageSize = Number(limit) || 8;
    const skipCount = (currentPage - 1) * pageSize;

    const pipeline = [];
    const matchStage = {};

    // Filter theo từ khóa tên sản phẩm
    let query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }

    // Filter theo đánh giá trung bình
    if (rating) {
      const ratingNum = Number(rating);
      if (ratingNum === 5) {
        matchStage['reviewSummary.averageRating'] = { $gte: 5 };
      } else {
        matchStage['reviewSummary.averageRating'] = {
          $gte: ratingNum,
          $lt: ratingNum + 1
        };
      }
    }

    // Filter theo danh mục
    if (category) {
      const categoryDoc = await Category.findOne({
        name: { $regex: new RegExp(`^${category}$`, 'i') }
      });
      if (!categoryDoc) return res.status(200).json({ message: 'OK', data: [], total: 0 });
      matchStage.category = categoryDoc._id;
    }

    // Filter theo thương hiệu
    if (brand) {
      const brandNames = Array.isArray(brand) ? brand : [brand];
      const brandDocs = await Brand.find({
        name: { $in: brandNames.map(b => new RegExp(`^${b}$`, 'i')) }
      });
      if (brandDocs.length === 0) return res.status(200).json({ message: 'OK', data: [], total: 0 });
      matchStage.brand = { $in: brandDocs.map(b => b._id) };
    }

    // Thêm stage $match nếu có filter
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Filter theo khoảng giá (nếu có)
    if (price_from || price_to) {
      const priceFilter = {};
      if (price_from) priceFilter.$gte = Number(price_from);
      if (price_to) priceFilter.$lte = Number(price_to);

      pipeline.push({
        $match: {
          variations: { $exists: true, $ne: [] },
          'variations.0.price': priceFilter
        }
      });
    }

    // Tính tổng sản phẩm sau filter
    const countPipeline = [...pipeline, { $count: 'total' }];
    const totalProducts = await Product.aggregate(countPipeline);
    const total = totalProducts[0]?.total || 0;

    // Pagination
    pipeline.push({ $sort: { _id: -1 } });  // sắp xếp mới nhất
    pipeline.push({ $skip: skipCount });
    pipeline.push({ $limit: pageSize });

    const products = await Product.aggregate(pipeline);

    return res.status(200).json({
      message: 'Lấy sản phẩm thành công',
      data: products,
      total,
      currentPage,
      pageSize
    });

  } catch (error) {
    console.error("Lỗi khi lấy tất cả sản phẩm:", error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

// --- LẤY CHI TIẾT SẢN PHẨM THEO ID ---
const getProductById = async (req, res) => {
  try {
    const { id: productId } = req.params;

    if (!productId) return res.status(400).json({ message: 'Product ID là bắt buộc' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    return res.status(200).json({
      message: 'Lấy chi tiết sản phẩm thành công',
      data: product
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

// TẠO SẢN PHẨM MỚI (Admin)
const createProduct = async (req, res) => {
    try {
        const { name, price, originalPrice, description, category, brand, countInStock } = req.body;
        
        // Xử lý ảnh upload
        let images = [];
        if (req.files && req.files.length > 0) {
            // Lưu đường dẫn tương đối: /uploads/ten-anh.jpg
            images = req.files.map(file => `/uploads/${file.filename}`);
        }

        const product = new Product({
            name,
            price,
            originalPrice,
            description,
            category,
            brand,
            countInStock,
            images: images,
            // Nếu schema của bạn dùng 'image' (số ít) thì sửa dòng trên thành: image: images[0]
            user: req.user._id // Người tạo
        });

        const createdProduct = await product.save();
        res.status(201).json({ message: 'Tạo sản phẩm thành công', product: createdProduct });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo sản phẩm', error: error.message });
    }
};

// CẬP NHẬT SẢN PHẨM (Admin)
const updateProduct = async (req, res) => {
    try {
        const { name, price, originalPrice, description, category, brand, countInStock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.originalPrice = originalPrice || product.originalPrice;
            product.description = description || product.description;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.countInStock = countInStock || product.countInStock;

            // Nếu có upload ảnh mới thì thay thế ảnh cũ
            if (req.files && req.files.length > 0) {
                const newImages = req.files.map(file => `/uploads/${file.filename}`);
                product.images = newImages; 
            }

            const updatedProduct = await product.save();
            res.status(200).json({ message: 'Cập nhật thành công', product: updatedProduct });
        } else {
            res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi cập nhật', error: error.message });
    }
};

// XÓA SẢN PHẨM (Admin)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.status(200).json({ message: 'Xóa sản phẩm thành công' });
        } else {
            res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xóa sản phẩm', error: error.message });
    }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
