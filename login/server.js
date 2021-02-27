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
    let playerName = req.body.playerName;
    let gameId = req.body.gameId;
    res.send(`Player Name: ${playerName} Game ID: ${gameId}`); // TODO: delete?

    // TODO: submit hit backend server to register user and set current ID to that of playerId returned

});

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));