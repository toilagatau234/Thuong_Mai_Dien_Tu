const Address = require('../models/Address');

const getUserAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: 1 });
        res.status(200).json({
            success: true,
            data: addresses
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách địa chỉ:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách địa chỉ'
        });
    }
};

const addAddress = async (req, res) => {
    try {
        const { province, district, ward, specificAddress, isDefault, type } = req.body;
        const { firstName, lastName, phone, id: userId } = req.user;

        if (!province || !district || !ward || !specificAddress) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin địa chỉ'
            });
        }

        const newAddress = new Address({
            fullName: `${firstName} ${lastName}`.trim(),
            phone,
            province,
            district,
            ward,
            specificAddress,
            isDefault: isDefault || false,
            type: type || 'home',
            user: userId
        });

        const savedAddress = await newAddress.save();

        res.status(201).json({
            success: true,
            message: 'Thêm địa chỉ mới thành công',
            data: savedAddress
        });
    } catch (error) {
        console.error('Lỗi khi thêm địa chỉ mới:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Đã xảy ra lỗi khi thêm địa chỉ mới'
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { fullName, phone, province, district, ward, specificAddress, isDefault, type } = req.body;

        if (!fullName || !phone || !province || !district || !ward || !specificAddress) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin địa chỉ'
            });
        }

        if (isDefault) {
            await Address.updateMany(
                { user: req.user.id, isDefault: true },
                { $set: { isDefault: false } }
            );
        }

        const updateData = {
            fullName,
            phone,
            province,
            district,
            ward,
            specificAddress,
            isDefault,
            type
        };

        const address = await Address.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy địa chỉ hoặc bạn không có quyền'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật địa chỉ thành công',
            data: address
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật địa chỉ:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Đã xảy ra lỗi khi cập nhật địa chỉ'
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy địa chỉ hoặc bạn không có quyền'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Xóa địa chỉ thành công'
        });
    } catch (error) {
        console.error('Lỗi khi xóa địa chỉ:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa địa chỉ'
        });
    }
};

const setDefaultAddress = async (req, res) => {
    try {
        await Address.updateMany(
            { user: req.user.id },
            { $set: { isDefault: false } }
        );

        const address = await Address.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: { isDefault: true } },
            { new: true }
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy địa chỉ hoặc bạn không có quyền'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Đặt địa chỉ mặc định thành công',
            data: address
        });
    } catch (error) {
        console.error('Lỗi khi đặt địa chỉ mặc định:', error);
        return res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đặt địa chỉ mặc định'
        });
    }
};

module.exports = {
    getUserAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
};
