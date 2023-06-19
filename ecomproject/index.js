const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 4000;
const routes = require("./src/Routes/Routes");
const chalk = require("chalk");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://prasanna347306:19F139@ecommerce.co8sozu.mongodb.net/ecommerce",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    const db = mongoose.connection;

    app.use(express.json());
    app.use(cors());

    app.use("/api", routes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      res.status(500).json({ error: "Internal server error" });
    });

    app.listen(PORT, () => {
      chalk.blue(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    chalk.red("Error connecting to MongoDB:", error);
  });
