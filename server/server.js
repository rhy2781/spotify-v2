// express server package
const express = require('express')
const cors = require('cors')

// module files
const auth = require('./routes/auth')
const token = require('./token')
const credentials = require('./credentials')

const port = 5001
var app = express()
var options = {
    origin: 'http://localhost:3000'
}
app.use(cors(options))

app.use('/auth', auth)

app.get('/test', (req, res) => {
    res.json({
        'client_id': credentials.getClientId(),
        'client_secret': credentials.getClientSecret(),
        'redirect_uri': credentials.getRedirectUri(),
        'token': token.getSpotifyToken()
    })
})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`)
})