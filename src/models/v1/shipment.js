const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
    tracking: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    origin: {
        country: {
            type: String,
            required: true,
            trim: true
        },
        stateOrRegionOrProvince: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        addressLine1: {
            type: String,
            required: true,
            trim: true
        },
        addressLine2: {
            type: String,
            trim: true
        }
    },
    recipient: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isMobilePhone(value)) {
                    throw new Error(`Invalid phone ${value}`);
                }
            }
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isMobilePhone(value)) {
                    throw new Error(`Invalid email ${value}`);
                }
            }
        }
    },
    mode: {
        type: String,
        enum: ['express', 'standard'],
        default: 'standard'
    },
    stage: {
        type: String,
        enum: ['shipment created','packages received', 'bill uploaded', 'bill approved', 'departing origin', 'arriving destination', 'shipping calculated', 'shipping paid', 'out of delivery'],
        default: 'shipment created'
    },
    status: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        default: 'pending'
    },
    totalCost: {
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
    }
}, {
    timestamps: {createdAt: true},
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Shipment = mongoose.model('Shipment', shippingSchema);

module.exports = Shipment;
