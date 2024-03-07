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
    if (state === 0) {
        console.log("process 0")
        fetch('https://api.spotify.com/v1/me/player/repeat?state=context', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }
    else if (state === 1) {
        fetch('https://api.spotify.com/v1/me/player/repeat?state=track', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }
    else {
        fetch('https://api.spotify.com/v1/me/player/repeat?state=off', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.getSpotifyToken()}`
            }
        })
    }
})



// const data = await fetch('https://api.spotify.com/v1/me/player', {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer ${token.getSpotifyToken()}`
//     }
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         // console.log(data)
//         let progressMin = Math.floor((data.progress_ms / 1000) / 60)
//         let progressSec = Math.floor((data.progress_ms / 1000) % 60)
//         let progressString = `${progressMin}:${progressSec.toString().padStart(2, '0')}`

//         let durationMin = Math.floor(((data.item.duration_ms - data.progress_ms) / 1000) / 60)
//         let durationSec = Math.floor(((data.item.duration_ms - data.progress_ms) / 1000) % 60)
//         let durationString = `${durationMin}:${durationSec.toString().padStart(2, '0')}`

//         let durationMS = data.item.duration_ms
//         let progressPercentage = data.progress_ms / data.item.duration_ms

//         return {
//             progressString,
//             durationString,
//             durationMS,
//             progressPercentage
//         }
//     })

// return data;
// }

router.get('/update', async (req, res) => {
    // console.log('update request received')
    try {
        res.send({"temp":"temp"})
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router