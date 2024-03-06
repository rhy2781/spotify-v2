const express = require('express')
const router = express.Router()


const token = require('../token')

router.use(express.json())

router.post('/shuffle', (req, res) => {
    var state = req.body.state
    if (state) {
        fetch('http://api.spotify.com/v1/me/player/shuffle?state=false', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }
    else {
        console.log("state read as false")
        fetch('http://api.spotify.com/v1/me/player/shuffle?state=true', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }



})

module.exports = router