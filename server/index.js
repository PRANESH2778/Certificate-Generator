const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const certificateRoutes = require('./routes/CertificateRoutes')
const app = express()
const cors = require('cors')
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to Db");
})
.catch((error)=>{
    console.log(error);
    console.log("error connecting db");
});
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({message:"welcome to the home"});
});
app.use("/certificate",certificateRoutes);
//server Listening
app.listen(port,()=>{
    console.log(`Listening to the post ${port}`);
});
