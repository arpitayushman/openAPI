const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Complaints = require('../models/complaint');
const { body, validationResult } = require('express-validator');

//Route 1: Get all the complaints using get request
router.get('/fetchallcomplaints',fetchuser , async (req,res)=>{
    try{

        const complaints = await Complaints.find({client : req.client.id});
        res.json(complaints);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route 2 Add a new note using : Post: "/api/auth/addnote"
router.post('/addnote', fetchuser,[
    body('detailOne', 'Enter a valid detailOne').isLength({min : 3}),
    body('detailTwo', 'DetailTwo must be atleast 5 characters').isLength({min : 5})
], async(req, res)=>{
    try{
    const { detailOne,detailTwo,detailThree,detailFour } = req.body;
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        const note = new Complaints({
            detailOne,detailTwo,detailThree,detailFour, client: req.client.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
// const express = require('express');
// const router = express.Router();
// const fetchuser = require('../middleware/fetchuser');
// const Note = require('../models/Note');
// const { body, validationResult } = require('express-validator');

// // ROUTE 1: Get All the Complaints using: GET "/api/complaints/getuser". Login required
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//     try {
//         const complaints = await Note.find({ client: req.client.id });
//         res.json(complaints)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

// // ROUTE 2: Add a new Note using: POST "/api/complaints/addnote". Login required
// router.post('/addnote', fetchuser, [
//     body('title', 'Enter a valid title').isLength({ min: 3 }),
//     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
//         try {
//             const { title, description, tag } = req.body;

//             // If there are errors, return Bad request and the errors
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }
//             const note = new Note({
//                 title, description, tag, client: req.client.id
//             })
//             const savedNote = await note.save()

//             res.json(savedNote)

//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Internal Server Error");
//         }
//     })
//     module.exports = router