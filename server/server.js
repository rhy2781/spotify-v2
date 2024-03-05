// express server package
const express = require('express')

// module files
const auth = require('./routes/auth')
const credentials = require('./credentials')

const port = 5001
var app = express()

app.get('/test', (req, res) => {
    res.json({
        'client_id': credentials.getClientId(),
        'client_secret': credentials.getClientSecret(),
        'redirect_uri': credentials.getRedirectUri(),
    })

})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`)
})