const express = require("express");
const router = express.Router();

const {
  Getuserdata,
  Postuserdata,
  Postuserlogdetails,
  Postfinalorderdata,
  Getprofiledata,
  Postoderdetails,
  Posttheprofiledata,
  Getprofiledatabyid,
  PostOderProductDetails,
  Profiledatadelete,
  Updateprofiledatabyid,
} = require("../Controllers/Controller");

router.get("/userdata", Getuserdata);// get the user Customer data to signin
router.get("/profileData", Getprofiledata);// get profile data of the customer 
router.get("/profileDataById/:id", Getprofiledatabyid);// get the profile data based on id used to populate the data into the input field 
router.post("/userLogDetails", Postuserlogdetails); // post the Customer login log into db
router.post("/userdata", Postuserdata); // used to post the sigin data to create acccount for customer 
router.post("/finalorderdata", Postfinalorderdata);// post the product order into DB
router.post("/orderdetails", Postoderdetails); // to post the order into the db
router.post("/profiledata", Posttheprofiledata);// post the profile data
router.delete("/profiledatadelete/:id", Profiledatadelete);// delete the profile data
router.put("/updateprofiledatabyid/:id", Updateprofiledatabyid); // update the profile data
router.post("/orderproductdetails", PostOderProductDetails);// post the order of product details


module.exports = router;
