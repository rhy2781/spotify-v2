// server quality of life
const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const request = require('request')

// import file for credentials and token storage
const credentials = require('../credentials')
const token = require('../token')

// local variable to validate the state of the web application
var state_check = ''

// method for generating the state variable
var generateRandomString = function (length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

// login request to the spotify authentication service
router.get('/login', (req, res) => {
    // console.log("login requested")
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state playlist-read-private'
    res.redirect('http://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: credentials.getClientId(),
            scope: scope,
            redirect_uri: credentials.getRedirectUri(),
            state: state
        })
    );
    state_check = state
})

// callback is received from spotify authentication service
router.get('/callback', function (req, res) {
    let code = req.query.code || null;
    let state = req.query.state || null;
    if (state == null || state.localeCompare(state_check) != 0) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            })
        )
    } else {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: credentials.getRedirectUri(),
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(
                    credentials.getClientId() + ':' + credentials.getClientSecret()).toString('base64'))
            },
            json: true
        };
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                token.setSpotifyToken(body.access_token)
                access_token = body.access_token
                res.redirect('http://localhost:3000/');
            }
        });
    }
});


router.get('/token', (req, res) => {
    res.json({ 'token': token.getSpotifyToken() })
})

module.exports = router