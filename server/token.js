let spotifyToken = null

module.exports = {
    getSpotifyToken: () => spotifyToken,
    setSpotifyToken: (token) => spotifyToken = token
}