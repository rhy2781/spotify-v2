// import the variables from the .env file for use
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, '../.env') })
let client_id = process.env.SPOTIFY_CLIENT_ID
let client_secret = process.env.SPOTIFY_CLIENT_SECRET
let redirect_uri = process.env.REACT_APP_BACKEND + '/auth/callback'

module.exports = {
    getClientId: () => client_id,
    getClientSecret: () => client_secret,
    getRedirectUri: () => redirect_uri
}