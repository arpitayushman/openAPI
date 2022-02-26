const mongoose = require('mongoose');
const { Schema } = mongoose;
const complaintSchema = new Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    selectedCompany: {
        type: String,
        required: true
    },
    requestId: {
        type: String,
        required: true
    },
    
    state: {
        type: String,
        required: true
    },
    disputeType: { 
        type: String,
        required: true
    },
    petiotionerName:{
        type: String,
        required: true
    },
    petitionerOrganisation:{
        type: String,
        required: false
    },
    petitionerPhone:{
        type: String,
        required: true
    },
    petitionerEmail:{
        type: String,
        required:true
    },
    petitionerAdvocateName:{
        type: String,
        required:false
    },
    petitionerAdvocatePhone:{
        type: String,
        required:false
    },
    petitionerAdvocateEmail:{
        type: String,
        required:false
    },
    respondentName:{
        type: String,
        required:true
    },
    respondentPhone:{
        type: String,
        required:true
    },
    respondentEmail:{
        type: String,
        required:false
    },respondentAddress:{
        type: String,
        required:true
    },
    respondentAdvocateName:{
        type: String,
        required:false
    },respondentAdvocatePhone:{
        type: String,
        required:false
    },
    respondentAdvocateEmail:{
        type: String,
        required:false
    },
    relationshipType:{
        type: String,
        required:false
    },
    lastOfferDate:{
        type: String,
        required:false
    },defaults:{
        type: String,
        required:false
    },
    legalStatus:{
        type: String,
        required: false
    },
    issues:{
        type: String,
        required:false
    },
    loanAmount:{
        type: String,
        required:false
    },
    emi:{
       type: String,
       required: false 
    },
    otherInfo:{
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('complaintDbComp', complaintSchema);