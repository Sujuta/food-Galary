const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('css'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB");
});

// Define a Mongoose schema for a user
const userSchema = new mongoose.Schema({
  Firstname: String,
  Lastname: String,
  Username: String,
  City: String,
  State: String
});

// Create a Mongoose model for a user
const User = mongoose.model('User', userSchema);

// Handle a POST request to /sign_up
app.post("/sign_up", (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      throw err;
    }
    console.log("User saved successfully");
    res.redirect('signup_successful.html');
  });
});

// Handle a GET request to /
app.get("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  res.redirect('login.html');
});

// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});