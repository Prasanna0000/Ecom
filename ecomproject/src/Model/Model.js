const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define the schema fields here
  name: String,
  email: String,
  password: String,
  phonenumber: String,
  datelog: Date
}, {
  collection: 'signin' // Specify the collection name here
});

const User = mongoose.model('User', userSchema);

module.exports = User;
