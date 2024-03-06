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
        fetch('http://api.spotify.com/v1/me/player/shuffle?state=true', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }
})


router.post('/repeat', (req, res) => {
    var state = req.body.state;
    if(state === 0){
        console.log("process 0")
        fetch('https://api.spotify.com/v1/me/player/repeat?state=context', {
            method: 'PUT',
            headers:{
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }
    else if(state === 1){
        fetch('https://api.spotify.com/v1/me/player/repeat?state=track', {
            method: 'PUT',
            headers:{
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }
    else{
        fetch('https://api.spotify.com/v1/me/player/repeat?state=off', {
            method: 'PUT',
            headers:{
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }

})

module.exports = router