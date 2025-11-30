const Product = require('../models/Product.js');
const Category = require('../models/Category.js');
const Brand = require('../models/Brand.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

// --- 1. LẤY TẤT CẢ SẢN PHẨM ---
const getAllProducts = async (req, res) => {
  try {
    const {
      search, category, brand, rating, 
      price_from, price_to, price_min, price_max, 
      page, limit, status
    } = req.query;

    const currentPage = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skipCount = (currentPage - 1) * pageSize;

    const matchStage = {};

    if (search) matchStage.name = { $regex: search, $options: 'i' };
    if (status) matchStage.status = status;

    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        matchStage.category = new mongoose.Types.ObjectId(category);
      } else {
        const categoryDoc = await Category.findOne({ name: { $regex: category, $options: 'i' } });
        if (categoryDoc) matchStage.category = categoryDoc._id;
        else return res.status(200).json({ message: 'Success', data: [], total: 0 });
      }
    }

    if (brand) {
      if (mongoose.Types.ObjectId.isValid(brand)) {
        matchStage.brand = new mongoose.Types.ObjectId(brand);
      } else {
        const brandDoc = await Brand.findOne({ name: { $regex: brand, $options: 'i' } });
        if (brandDoc) matchStage.brand = brandDoc._id;
        else return res.status(200).json({ message: 'Success', data: [], total: 0 });
      }
    }

    if (rating) {
        // Lọc theo rating (nếu model bạn dùng rating ở ngoài thì sửa thành rating, 
        // nếu dùng reviewsSummary.averageRating thì giữ nguyên)
        matchStage.rating = { $gte: Number(rating) }; 
    }

    const min = Number(price_from) || Number(price_min) || 0;
    const max = Number(price_to) || Number(price_max) || 0;

    if (min > 0 || max > 0) {
      const priceCondition = {};
      if (min > 0) priceCondition.$gte = min;
      if (max > 0) priceCondition.$lte = max;

      matchStage.$or = [
        { price: { ...priceCondition, $gt: 0 } }, 
        { "variations.price": priceCondition }
      ];
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryData'
        }
      },
      { $unwind: { path: '$categoryData', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brandData'
        }
      },
      { $unwind: { path: '$brandData', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          category: '$categoryData',
          brand: '$brandData' 
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [{ $skip: skipCount }, { $limit: pageSize }],
          totalCount: [{ $count: 'count' }]
        }
      }
    ];

    const result = await Product.aggregate(pipeline);
    const products = result[0].data;
    const total = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;

    return res.status(200).json({
      message: 'Thành công',
      data: products,
      total,
      currentPage,
      pageSize
    });

  } catch (error) {
    console.error("Lỗi filter sản phẩm:", error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

// --- 2. LẤY CHI TIẾT SẢN PHẨM ---
const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('brand');
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    return res.status(200).json({ data: product }); 
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

// --- 3. TẠO SẢN PHẨM ---
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, isFlashSale, countInStock, flashSalePrice, variants } = req.body;

    let imageObjects = [];
    if (req.files && req.files.length > 0) {
      imageObjects = req.files.map(file => ({ url: `/uploads/${file.filename}` }));
    }

    let parsedVariants = [];
    if (variants) {
      try { parsedVariants = JSON.parse(variants); } catch (e) { }
    }

    let totalStock = Number(countInStock) || 0;
    if (parsedVariants.length > 0) {
      totalStock = parsedVariants.reduce((acc, curr) => acc + Number(curr.quantity || 0), 0);
    }
    const product = new Product({
      name,
      price: Number(price) || 0,
      description,
      category,
      countInStock: totalStock,
      images: imageObjects,
      variations: parsedVariants,
      isFlashSale: isFlashSale === 'true' || isFlashSale === true,
      flashSalePrice: Number(flashSalePrice) || 0,
      user: req.user ? req.user._id : null
    });

    const createdProduct = await product.save();
    res.status(201).json({ message: 'Tạo thành công', product: createdProduct });
  } catch (error) {
    console.error("Lỗi tạo SP:", error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// --- 4. CẬP NHẬT SẢN PHẨM ---
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy' });

    const {
      name, price, description, category,
      isFlashSale, flashSalePrice, variants,
      status,
      existingImages
    } = req.body;

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (status) product.status = status;

    if (isFlashSale !== undefined) product.isFlashSale = isFlashSale;
    if (flashSalePrice !== undefined) product.flashSalePrice = flashSalePrice;

    if (variants) {
      try {
        product.variations = JSON.parse(variants);
        product.countInStock = product.variations.reduce((acc, curr) => acc + Number(curr.quantity || 0), 0);
      } catch (e) { }
    }

    let finalImages = [];
    if (existingImages) {
      try { finalImages = JSON.parse(existingImages); } catch (e) { finalImages = product.images; }
    }
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({ url: `/uploads/${file.filename}` }));
      finalImages = [...finalImages, ...newImages];
    }
    
    if (req.files?.length > 0 || (existingImages && finalImages.length !== product.images.length)) {
      product.images = finalImages;
    }

    await product.save();
    res.status(200).json({ message: 'Cập nhật thành công', product });
  } catch (error) {
    console.error("Lỗi update:", error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// --- 5. XÓA SẢN PHẨM ---
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Đã xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// --- 6. 👇👇👇 TẠO ĐÁNH GIÁ SẢN PHẨM (NEW) 👇👇👇 ---
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // Kiểm tra user đã đánh giá chưa (nếu cần thì bật lại)
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này rồi' });
      }

      const review = {
        name: req.user.name || req.user.firstName || 'User',
        rating: Number(rating),
        comment,
        user: req.user.id,
        avatar: req.user.avatar
      };

      // Thêm review vào mảng
      product.reviews.push(review);

      // Cập nhật số lượng review
      product.numReviews = product.reviews.length;

      // Tính lại điểm trung bình
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
// --------------------------------------------------------

const getAllProductsPublic = getAllProducts; 
const getProductByIdPublic = getProductDetails;
const addToWishlist = async (req, res) => { res.status(200).json({}); };

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview, // 👈 ĐÃ EXPORT HÀM NÀY
  addToWishlist,
  getAllProductsPublic,
  getProductByIdPublic
};