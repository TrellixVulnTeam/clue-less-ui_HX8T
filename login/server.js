// Import helpers
let helpers = require('./helpers');

const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app

// Read Properties
var propertiesReader = require('properties-reader');
var properties = propertiesReader(__dirname + '/config/application.properties');

// Set constants from properties
const port = properties.get('application.port'); // Port we will listen on
const backend_host = properties.get('backend.host'); // Hostname for connecting with backend server
const backend_port = properties.get('backend.port'); // Port for connecting with backend server

console.log(`Application Port: ${port}`);
console.log(`Backend Host: ${backend_host}`);
console.log(`Backend Port: ${backend_port}`);

// Configure Axios
const axios = require('axios')

var bodyParser = require('body-parser'); // middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

// Route to Login Information
app.post('/login', (req, res) => {
    // Insert Login Code Here
    let playerName = req.body.playerName;

    console.log(`${playerName} initialized a new game!`);

    const http_login = async () => {
        let full_url = `${backend_host}:${backend_port}/games/?name=${playerName}`
        var body = await axios.post(full_url, {})
            .then((res)=>{
                return res.data;
            }).catch((err)=>{
                console.log(`OH NO ERROR: ${err}`);
            })
        return await body; 
    }

    http_login()
        .then(response => {
            console.log(`Games ID: ${JSON.stringify(response.gameId)}`);
            res.send(`Games ID: ${JSON.stringify(response.gameId)}`); // present in web page
        })
        .catch;

});

// Start listening
app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`This app is listening on port ${port}`));

