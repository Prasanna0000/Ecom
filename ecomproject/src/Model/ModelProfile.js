const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  doornumber: String,
  street: String,
  landmark: String,
  pincode: String,
  district: String,
  location: String,
  description: String,
});

const Profile = mongoose.model("Profile", profileSchema, "profile");

module.exports = Profile;
