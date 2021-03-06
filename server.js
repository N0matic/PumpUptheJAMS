const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Port configured for either heroku or Local Host
const PORT = process.env.PORT || 3000;

// Looking at all files in the models folder
const db = require("./models");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

require("./routes/html-routes.js")(app)
require("./routes/api-routes.js")(app)

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
