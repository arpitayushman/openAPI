const mongoose = require('mongoose');
const dbUrl = "mongodb://localhost:27017/openAPI?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongoose =()=>{
    mongoose.connect(dbUrl, ()=>{
        console.log("Database Connected");
    })
}
module.exports = connectToMongoose;