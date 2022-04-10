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
const { SequentialRoundRobin } = require('round-robin-js');


//Route 1: Get all the complaints using get request
router.get('/fetchallcomplaints', fetchuser, async (req, res) => {
    try {

        const complaints = await Complaints.find({ client: req.client.id });
        res.json(complaints);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/fetchCC', fetchcompany, async (req, res) => {
    try {

        let complaints = await cByc.find({ company: req.company.id });
        res.json(complaints);
    }
    catch (error) {
        console.error(error.message);
        console.log(error.stack);
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


// Route 3
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatcomplaint". Login required
router.put('/updatecomplaint/:id', fetchcompany, async (req, res) => {
    const { legalStatus } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (legalStatus) { newNote.legalStatus = legalStatus };
        // if (description) { newNote.description = description };
        // if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await cByc.findById(req.params.id);
        // let reqId = note.requestId;
        // console.log(reqId);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.company.toString() !== req.company.id) {
            return res.status(401).send("Not Allowed");
        }
        console.log(req.params.id);
        note = await cByc.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
        // const compNote = {};
        // if (loanAmount) { compNote.loanAmount = loanAmount };
        // let companyNote = await cByc.findOne({reqId});
        // let idOfCompanyComplaint = companyNote._id;
        // idOfCompanyComplaint+="";
        // console.log(idOfCompanyComplaint+"");
        // console.log(companyNote.respondentName);
        // note = await cByc.findByIdAndUpdate(idOfCompanyComplaint, { $set: compNote }, { new: true })



    } catch (error) {
        error.trace
        console.error(error.message);
        console.log(error.stack);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE 4: FETCHING Case Status by requestId


router.post('/fetchcasestatus', fetchuser, async (req, res) => {
    const { requestId } = req.body;
    try {
        const complaint = await cByc.findOne({ requestId });
        let status = complaint.legalStatus;
        if (status.length == 0) {
            status = "Case Status is not yet updated by the Service Provider, Kindly wait for 24 hours.";
        }
        console.log(status);
        res.json(status);
    }
    catch (error) {
        console.error(error.message);
        console.log(error.stack);
        res.status(500).send("Internal Server Error");
    }
});

let staticIndex = 0;
// if(staticIndex == companies.length-1)staticIndex = 0;
//Route 5-- Fetch all companies
router.get('/fetchcompanies', async (req, res) => {
    try {
        const companies = await Company.find();
        // let arr = companies;
        // console.log(typeof companies);
        // const sequentialTable = new SequentialRoundRobin(companies);
        // res.json(sequentialTable.next());
        console.log(staticIndex);
        // console.log(companies.length);
        companies.sort((a, b) => (a.name > b.name) ? 1 : -1)
        res.json(companies[staticIndex++]);
        if(staticIndex == companies.length){
            staticIndex = 0;
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;