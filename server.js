




// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//body-parser as the middle ware to the express to handle HTTP POST
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder , this line allows talking between server and client side
app.use(express.static('website'));

//debug 
var debug = require('debug');

// Setup Server
const port = 8000;
const server = app.listen(port , ()=>{console.log(`the server running on localhost: ${port}`);}); //the callback function






var projectData = [];

app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
  console.log(projectData);
};


//POST function
app.post('/addAnimal' ,addAnimal);
function addAnimal (req,res) {
	// body...
	console.log(req.body);
	newEntry = {
		"temp": req.body.temp,
		"date": req.body.date,
		"feelings": req.body.feelings
	}
	
	projectData.push(newEntry)
	res.send(projectData)
	console.log(projectData)
}
/* Empty JS object to act as endpoint for all routes */



