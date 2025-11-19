// models/User.js (Backend)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, default: '' },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: { 
        type: String,
        default: ''
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    password: { type: String, required: true },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    birthday: { type: Date },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    addresses: { type: Array, default: [] },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { 
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.resetPasswordToken;
            delete ret.resetPasswordExpires;
            return ret;
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
