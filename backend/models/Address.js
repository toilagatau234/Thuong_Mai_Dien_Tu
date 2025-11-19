const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(v);
            },
            message: props => `${props.value} không phải là số điện thoại hợp lệ!`
        }
    },
    province: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    specificAddress: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    isDefault: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['home', 'office', 'other'],
        default: 'home'
    }
}, {
    timestamps: true
});

// Ensure a user can only have one default address
addressSchema.pre('save', async function(next) {
    if (this.isDefault) {
        await this.constructor.updateMany(
            { user: this.user, isDefault: true },
            { $set: { isDefault: false } }
        );
    }
    next();
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
