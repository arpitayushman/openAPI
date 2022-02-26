const express = require('express');
const axios = require('axios');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Complaints = require('../models/complaint');
const Company = require('../models/company');
const cByc = require('../models/complaintDbComp');
const { body, validationResult } = require('express-validator');
const fetchcompany = require('../middleware/fetchcompany');
const company = require('../models/company');


//Route 1: Get all the complaints using get request
router.get('/fetchallcomplaints', fetchuser, async (req, res) => {
    try {

        const complaints = await Complaints.find({ user: req.user.id });
        res.json(complaints);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/fetchCC', fetchcompany, async (req, res) => {
    try {

        const complaints = await cByc.find({ company: req.company.id });
        res.json(complaints);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route 2 Add a new note using : Post: "/api/auth/addnote"
router.post('/addnote', fetchuser, [
    body('petitionerEmail', 'Enter a valid detailOne').isLength({ min: 3 }),
    body('petitionerPhone', 'DetailTwo must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        //selecttedComany is the API provided by the company while registering
        const { selectedCompany,
            requestId,
            state,
            disputeType,
            petiotionerName,
            petitionerOrganisation,
            petitionerPhone,
            petitionerEmail,
            petitionerAdvocateName,
            petitionerAdvocatePhone,
            petitionerAdvocateEmail,
            respondentName,
            respondentPhone,
            respondentEmail,
            respondentAddress,
            respondentAdvocateName,
            respondentAdvocatePhone,
            respondentAdvocateEmail,
            relationshipType,
            lastOfferDate,
            defaults,
            legalStatus,
            issues,
            loanAmount,
            emi,
            otherInfo } = req.body;
        const selectedApi = req.body.selectedCompany; //unique api of the selected company
        // let selectedApi = "https://"
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Complaints({
            selectedCompany,
            requestId,
            state,
            disputeType,
            petiotionerName,
            petitionerOrganisation,
            petitionerPhone,
            petitionerEmail,
            petitionerAdvocateName,
            petitionerAdvocatePhone,
            petitionerAdvocateEmail,
            respondentName,
            respondentPhone,
            respondentEmail,
            respondentAddress,
            respondentAdvocateName,
            respondentAdvocatePhone,
            respondentAdvocateEmail,
            relationshipType,
            lastOfferDate,
            defaults,
            legalStatus,
            issues,
            loanAmount,
            emi,
            otherInfo,
            client: req.client.id
        })
        const savedNote = await note.save();
        const companyNote = new cByc({
            company: selectedCompany,
            selectedCompany,
            requestId,
            state,
            disputeType,
            petiotionerName,
            petitionerOrganisation,
            petitionerPhone,
            petitionerEmail,
            petitionerAdvocateName,
            petitionerAdvocatePhone,
            petitionerAdvocateEmail,
            respondentName,
            respondentPhone,
            respondentEmail,
            respondentAddress,
            respondentAdvocateName,
            respondentAdvocatePhone,
            respondentAdvocateEmail,
            relationshipType,
            lastOfferDate,
            defaults,
            legalStatus,
            issues,
            loanAmount,
            emi,
            otherInfo
        })
        const savedCompanyNote = await companyNote.save();

        // const savedComplaintVisibleToCompany = await 


        // axios.post(selectedApi, note)
        //     .then((res) => {
        //         console.log(`Status: ${res.status}`);
        //         // console.log('Body: ', res.data);
        //         let body = res.note;
        //         console.log(body);
        //     }).catch((err) => {
        //         console.error(err);
        //     });


        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;