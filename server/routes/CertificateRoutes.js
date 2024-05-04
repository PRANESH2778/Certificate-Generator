const express = require("express")
const Certificate = require('../modals/CertificateModal')
const router = express.Router()

router.post("/create", async (req, res) => {
    try {
      const { userName,email, courseName, date, link ,certificateId} = req.body;
      //dueDate and state is not mandatory
      if (!userName ||!email|| !courseName || !date || !link) {
        return res.status(400).json({ message: "Enter all Details" });
      }
      const CertificateData = new Certificate({
        userName,
        email,
        courseName,
        date,
        link,
        certificateId,
      });
      const CertificateResponse = await CertificateData.save();
      res
        .status(201)
        .json({ message: "Certificate Generated Successfully", Certificate: CertificateResponse });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error! Try Again" });
    }
  });
  router.get("/all",async(req,res)=>{
    try {
      const certificateDetails = await Certificate.find();
      res.status(200).json({Certificates:certificateDetails})
    } catch (error) {
      res.status(400).json({message:"No certificates found"})
    }
  })
  module.exports = router