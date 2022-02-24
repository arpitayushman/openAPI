const mongoose = require('mongoose');
const { Schema } = mongoose;
const complaintSchema = new Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    detailOne: {
        type: String,
        required: true
    },
    detailTwo: {
        type: String,
        required: true
    },
    detailThree: {
        type: String,
        required: true
    },
    detailFour: {
        type: String,
        required: true
    },
    selectedCompany:{
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('complaintDbComp', complaintSchema);