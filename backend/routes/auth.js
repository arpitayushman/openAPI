// const express = require('express');
// const User = require('../models/user');
// const Company = require('../models/company');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const fetchuser = require('../middleware/fetchuser');
// const fetchcompany = require('../middleware/fetchcompany');
// const JWT_SECRET = 'WinterIsComing';
// const { body, validationResult } = require('express-validator');
// //no login req
// //Route - 1
// router.post('/createclient', [
//     body('email', 'Enter Valid Email').isEmail(),
//     body('phone', 'Enter a valid contact number').isLength(10),
//     body('password', 'Password must be greater than 3').isLength({ min: 3 })
// ], async (req, res) => {
//     //if there are errors, return bad request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     //check whether the user with this email is already registeres
//     try {

//         let user = await User.findOne({ email: req.body.email });
//         if (user) {
//             return res.status(400).json({ error: "Sorry, a user with this email already exist" });

//         }
//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(req.body.password, salt);
//         user = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             password: secPass,
//             address: req.body.address
//         });
//         const data = {
//             user: {
//                 id: user.id
//             }
//         }
//         const authToken = jwt.sign(data, JWT_SECRET);
//         console.log(authToken);
//         // res.json(user);
//         res.json({ authToken });
//     }
//     catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error!");
//     }
//     // .then(user => res.json(user));
//     // console.log(req.body);
//     // const user = User(req.body);
//     // user.save();
//     // res.send(req.body);
// });

// //Authenticate a user
// //Route - 2
// router.post('/clientlogin', [
//     body('email', 'Enter Valid Email').isEmail(),
//     body('password', 'Password cannot be blank').exists(),
// ], async (req, res) => {
//     //if there are errors, return bad request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: "Please enter correct credentials!" });
//         }
//         const passwordCompare = await bcrypt.compare(password, user.password);
//         if (!passwordCompare) {
//             return res.status(400).json({ error: "Please enter correct credentials!" });
//         }
//         const data = {
//             user: {
//                 id: user.id
//             }
//         }
//         console.log(data);
//         const authToken = jwt.sign(data, JWT_SECRET);
//         console.log(authToken);
//         // res.json(user);
//         res.json({ authToken });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error!");
//     }
// });


// //Route - 3: get logged in user detail using: POST "/api/auth/getuser" 
// router.post('/getclient', fetchuser, async (req, res) => {

//     try {
//         let userId = req.user.id;
//         const user = await User.findById(userId).select("-password")
//         res.send(user)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })


// //Route- 4 Create company profile in database
// router.post('/createcompany', [
//     body('email', 'Enter Valid Email').isEmail(),
//     body('phone', 'Enter a valid contact number').isLength(10),
//     body('address', 'Enter valid datailOne').isLength({ min: 3 }),
//     body('submitApi', 'Enter a valid url').isURL(),
//     body('password', 'Password must be greater than 3').isLength({ min: 3 })
// ], async (req, res) => {
//     //if there are errors, return bad request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     //check whether the user with this email is already registeres
//     try {

//         let company = await Company.findOne({ email: req.body.email });
//         if (company) {
//             return res.status(400).json({ error: "Sorry, a service provider with this email already exist" });

//         }
//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(req.body.password, salt);
//         company = await Company.create({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             address: req.body.address,
//             submitApi: req.body.submitApi,
//             password: secPass
//         });
//         const data = {
//             company: {
//                 id: company.id
//             }
//         }
//         const authToken = jwt.sign(data, JWT_SECRET);
//         console.log(authToken);
//         // res.json(user);
//         res.json({ authToken });
//     }
//     catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error!");
//     }
// });




// // ROUTE 4 Authenticate a company
// router.post('/companylogin', [
//     body('email', 'Enter Valid Email').isEmail(),
//     body('password', 'Password cannot be blank').exists(),
// ], async (req, res) => {
//     //if there are errors, return bad request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;
//     try {
//         let company = await Company.findOne({ email });
//         if (!company) {
//             return res.status(400).json({ error: "Please enter correct credentials!" });
//         }
//         const passwordCompare = await bcrypt.compare(password, company.password);
//         if (!passwordCompare) {
//             return res.status(400).json({ error: "Please enter correct credentials!" });
//         }
//         const data = {
//             company: {
//                 id: company.id
//             }
//         }
//         const authToken = jwt.sign(data, JWT_SECRET);
//         console.log(authToken);
//         // res.json(user);
//         res.json({ authToken });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error!");
//     }
// });
// router.post('/getcompany', fetchcompany, async (req, res) => {

//     try {
//         userId = req.company.id;
//         const company = await Company.findById(userId).select("-password")
//         res.send(company)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })


// module.exports = router;
































const express = require('express');
const Client = require('../models/client');
const Company = require('../models/company');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const fetchcompany = require('../middleware/fetchcompany');
const JWT_SECRET = 'WinterIsComing';
const { body, validationResult } = require('express-validator');
//no login req
//Route - 1
router.post('/createclient', [
    body('email', 'Enter Valid Email').isEmail(),
    body('phone', 'Enter a valid contact number').isLength(10),
    body('password', 'Password must be greater than 3').isLength({ min: 3 })
], async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the client with this email is already registeres
    try {

        let client = await Client.findOne({ email: req.body.email });
        if (client) {
            return res.status(400).json({ error: "Sorry, a client with this email already exist" });

        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        client = await Client.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: secPass,
            address: req.body.address
        });
        const data = {
            client: {
                id: client.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        // res.json(client);
        res.json({ authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
    // .then(client => res.json(client));
    // console.log(req.body);
    // const client = Client(req.body);
    // client.save();
    // res.send(req.body);
});

//Authenticate a client
//Route - 2
router.post('/clientlogin', [
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let client = await Client.findOne({ email });
        if (!client) {
            return res.status(400).json({ error: "Please enter correct credentials!" });
        }
        const passwordCompare = await bcrypt.compare(password, client.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please enter correct credentials!" });
        }
        const data = {
            client: {
                id: client.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        // res.json(client);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
});


//Route - 3: get logged in client detail using: POST "/api/auth/getuser" 
router.post('/getclient', fetchuser, async (req, res) => {

    try {
        userId = req.client.id;
        const client = await Client.findById(userId).select("-password")
        res.send(client)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//Route- 4 Create company profile in database
router.post('/createcompany', [
    body('email', 'Enter Valid Email').isEmail(),
    body('phone', 'Enter a valid contact number').isLength(10),
    body('detailOne', 'Enter valid datailOne').isLength(3),
    body('submitApi', 'Enter a valid url').isURL(),
    body('password', 'Password must be greater than 3').isLength({ min: 3 })
], async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the client with this email is already registeres
    try {

        let company = await Company.findOne({ email: req.body.email });
        if (company) {
            return res.status(400).json({ error: "Sorry, a client with this email already exist" });

        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        company = await Company.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            detailOne: req.body.detailOne,
            submitApi: req.body.submitApi,
            password: secPass
        });
        const data = {
            client: {
                id: company.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        // res.json(client);
        res.json({ authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
});




// ROUTE 4 Authenticate a company
router.post('/companylogin', [
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ error: "Please enter correct credentials!" });
        }
        const passwordCompare = await bcrypt.compare(password, company.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please enter correct credentials!" });
        }
        const data = {
            company: {
                id: company.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        // res.json(client);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
});
router.post('/getcompany', fetchcompany, async (req, res) => {

    try {
        userId = req.company.id;
        const company = await Company.findById(userId).select("-password")
        res.send(company)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;