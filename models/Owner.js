const mongoose = require('mongoose');
const RestaurentDetails = require('./Restaurents');

const VendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select :false
    },
    createdAt :{
        type:Date,
        default:Date.now
    },
    RestaurentDetails :[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Restaurent"
    }]
});

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor