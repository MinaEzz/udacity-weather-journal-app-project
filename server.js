// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 4000;
const listening = function () {
  console.log(`server running at localhost ${port}`);
};
app.listen(port, listening);

//GET route that returns the projectData object
app.get("/all", sendData);

function sendData(req, res) {
  res.send(projectData);
}

// POST route
app.post("/add", addData);

function addData(req, res) {
  projectData.date = req.body.date;
  projectData.name = req.body.name;
  projectData.temperature = req.body.temperature;
  projectData.state = req.body.state;
  projectData.userFeel = req.body.userFeel;
  res.end();
  console.log(projectData);
}
