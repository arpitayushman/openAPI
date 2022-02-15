const jwt = require('jsonwebtoken');
const JWT_SECRET = 'WinterIsComing';
const fetchcompany = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.company = data.company;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"});

    }
}
module.exports = fetchcompany;