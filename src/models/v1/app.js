const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
    charges: {
        fragile: {
            percentage: {
                type: Number,
                default: 0.1
            }
        },
        express: {
            percentage: {
                type: Number,
                default: 0.2
            }
        },
        insurance: {
            percentage: {
                type: Number,
                default: 5
            }
        }
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const App = mongoose.model('App', appSchema);
module.exports = App;
