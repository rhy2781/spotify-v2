let spotifyToken = null
let refreshToken = null
let expiresIn = null

module.exports = {
    getSpotifyToken: () => spotifyToken,
    setSpotifyToken: (token) => spotifyToken = token,
    getRefreshToken: () => refreshToken,
    setRefreshToken: (token) => refreshToken = token,
    getExpiresIn: () => expiresIn,
    setExpiresIn: (time) => expiresIn = time
}