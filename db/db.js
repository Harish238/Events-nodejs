const mongoose = require("mongoose");
const db = process.env.Mongo_Url;
mongoose.connect(db).then(()=>{
    console.log("Connected to mongodb.....");
}).catch(()=>{console.log("Not connected")})