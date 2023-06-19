const mongoose = require("mongoose");

// Define the Invoice schema
const invoiceSchema = new mongoose.Schema({
  username: String,
  useremail: String,
  totalprice: String,
  productcount: [String],
  productname: [String],
});

// Create the Invoice model
const Invoice = mongoose.model("Invoice", invoiceSchema, "invoice");

module.exports = Invoice;
