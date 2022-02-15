const mongoose = require('mongoose');
const { Schema } = mongoose;
const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    detailOne:{
        type: String,
        required:true
    },
    detailTwo:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('company', companySchema);