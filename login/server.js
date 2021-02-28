const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
var request = require('request');

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
    //http://localhost:3000/_getproduct/8821264
    request.post({ url: "http://localhost:8080/games/"},      function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(body);
                }
            });
});

const port = 3000 // Port we will listen on

// Start listening
app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`This app is listening on port ${port}`));

