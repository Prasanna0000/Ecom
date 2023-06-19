const { MongoClient, ObjectId } = require("mongodb");
const User = require("../Model/Model");
const Profile = require("../Model/ModelProfile");
const Invoice = require("../Model/ModelOrderPayment");

const uri =
  "mongodb+srv://prasanna347306:19F139@ecommerce.co8sozu.mongodb.net/ecommerce";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await client.connect();
  } catch (error) {
    return error;
  }
}

// Middleware to handle database connection
async function withDatabaseConnection(req, res, next) {
  if (!client.isConnected()) {
    await connectToDatabase();
  }
  next();
}

// Get user data
const Getuserdata = async (req, res) => {
  try {
    const db = client.db();
    const collection = db.collection("signin");
    const rows = await collection.find().toArray();
    res.json(rows);
  } catch (error) {
    res.sendStatus(500);
    return error;
  }
};

// Create a new user
const Postuserdata = async (req, res) => {
  try {
    const { name, email, password, phonenumber } = req.body;
    const datelog = new Date();

    const newUser = new User({
      name,
      email,
      password,
      phonenumber,
      datelog,
    });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return error;
  }
};

// Log user details
const Postuserlogdetails = async (req, res) => {
  try {
    const datelog = new Date();
    const db = client.db();
    const collection = db.collection("login");
    const { email } = req.body;

    const result = await collection.insertOne({
      email: email,
      datelog: datelog,
    });

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

// Post final order data
const Postfinalorderdata = async (req, res) => {
  try {
    const db = client.db();
    const collection = db.collection("checkout");
    const { productname, username, useremail, productcount } = req.body;

    const result = await collection.insertOne({
      productname,
      username,
      useremail,
      productcount,
    });

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

// Create a new invoice
const Postoderdetails = async (req, res) => {
  try {
    const { username, useremail, totalprice, productcount, productname } =
      req.body;

    const invoice = new Invoice({
      username,
      useremail,
      totalprice,
      productcount,
      productname,
    });

    await invoice.save();

    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Post profile data
const Posttheprofiledata = async (req, res) => {
  const db = client.db();
  const collection = db.collection("profile");
  const {
    doornumber,
    street,
    landmark,
    pincode,
    district,
    location,
    description,
  } = req.body;

  const result = await collection.insertOne({
    doornumber,
    street,
    landmark,
    pincode,
    district,
    location,
    description,
  });

  res.json(result);

};

// Get profile data
const Getprofiledata = async (req, res) => {
  try {
    const db = client.db();
    const collection = db.collection("profile");
    const rows = await collection.find().toArray();
    res.json(rows);
  } catch (error) {
    res.sendStatus(500).json({ success: false, error: error.message });
  }
};

// Delete profile data
const Profiledatadelete = async (req, res) => {
  const id = req.params.id;

  try {
    const db = client.db();
    const collection = db.collection("profile");

    const objectId = new ObjectId(id);

    await collection.deleteOne({ _id: objectId });

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting data" });
  }
};

// Get profile data by ID
const Getprofiledatabyid = async (req, res) => {
  const id = req.params.id;

  try {
    const db = client.db();
    const collection = db.collection("profile");

    const objectId = new ObjectId(id);

    const item = await collection.findOne({ _id: objectId });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

// Update profile data by ID
const Updateprofiledatabyid = async (req, res) => {
  const db = client.db();
  const collection = db.collection("profile");
  const {
    doornumber,
    street,
    landmark,
    pincode,
    district,
    location,
    description,
  } = req.body;

  const id = req.params.id;


  const objectId = new ObjectId(id);


  const result = await collection.updateOne(
    { _id: objectId },
    {
      $set: {
        doornumber,
        street,
        landmark,
        pincode,
        district,
        location,
        description,
      },
    }
  );
  res.status(200).json({ message: "Data updated successfully" });
};

// post product using react query

const PostOderProductDetails = async (req, res) => {
  try {
    const db = client.db();
    const collection = db.collection("product_reactquery");
    const { username, useremail, totalprice, productcount, productname } =
      req.body;

    const result = await collection.insertOne({
      username: username,
      useremail: useremail,
      totalprice: totalprice,
      productcount: productcount,
      productname: productname,
    });
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

module.exports = {
  Getuserdata,
  Postuserdata,
  Getprofiledata,
  Postuserlogdetails,
  Postfinalorderdata,
  Postoderdetails,
  PostOderProductDetails,
  Posttheprofiledata,
  Profiledatadelete,
  Getprofiledatabyid,
  Updateprofiledatabyid,
};
