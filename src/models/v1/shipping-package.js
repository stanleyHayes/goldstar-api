const mongoose = require("mongoose");

const shippingPackage = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    extras: {
        insurance: {
            type: Boolean,
            default: false
        }
    },
    value: {
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        currency: {
            type: String,
            enum: ['USD', 'EUR'],
            default: 'EUR'
        }
    },
    quantity: {
        type: Number,
        default: 1
    },
    shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fragile: {
        type: Boolean,
        default: false
    },
    dimensions: {
        width: {
            amount: {
                type: Number,
                min: 0,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['m', 'cm', 'mm', 'km', 'in'],
                default: 'cm'
            }
        },
        length: {
            amount: {
                type: Number,
                min: 0,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['m', 'cm', 'mm', 'km', 'in'],
                default: 'cm'
            }
        },
        height: {
            amount: {
                type: Number,
                min: 0,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['m', 'cm', 'mm', 'km', 'in'],
                default: 'cm'
            }
        },
        weight: {
            amount: {
                type: Number,
                min: 0,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['lb', 'kg', 'g', 'mg'],
                default: 'g'
            }
        }
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

const ShippingPackage = mongoose.model('ShippingPackage', shippingPackage);

module.exports = ShippingPackage;
