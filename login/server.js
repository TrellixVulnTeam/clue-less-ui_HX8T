const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app

const bodyParser = require('body-parser'); // middleware

app.use(bodyParser.urlencoded({ extended: false }));

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
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`); // TODO: delete?

    // TODO: submit hit backend server to register user and set current ID to that of playerId returned
    
});