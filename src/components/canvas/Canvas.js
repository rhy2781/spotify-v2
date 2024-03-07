import { React, useState, useEffect } from "react";
import Player from "../player/Player";

import './Canvas.css'


const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}


function Canvas(props) {

    const [player, setPlayer] = useState(undefined)
    const [active, setActive] = useState(false)

    const [pause, setPause] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(track)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState(0)
    const [volume, setVolume] = useState(0)

    const [ms, setMS] = useState(0)

    // spotify player object integration
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback Player -' + new Date().getTime(),
                getOAuthToken: cb => cb(props.token),
                volume: 0.05
            });

            setVolume(0.05);
            setPlayer(player);

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            // Player State Change Listener
            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }
                setCurrentTrack(state.track_window.current_track);
                setPause(state.paused);
                setShuffle(state.shuffle);
                setRepeat(state.repeat_mode);
                setMS(state.position)
                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });
            }));
            player.connect();
        };


        // TODO: figure out how to simulate time increment despite polling periodically for the time
        // setInterval(() => {
            // const temp = ms
            // console.log(temp)
            // console.log(temp + 300)
            // setMS(temp + 300)
            // setMS(temp + pause ? 0 : 300)
        // }, 300)


        //     // setInterval(progress, 1000); // Update every half second
        window.addEventListener('beforeunload', () => player.disconnect()); // disconnect player on reload
        window.addEventListener('close', () => player.disconnect()); // disconnect player when window closes
        return () => {
            window.removeEventListener('beforeunload', () => player.disconnect());
            window.removeEventListener('close', () => player.disconnect());
            player.disconnect();
        };
    }, []);


    if (active) {
        return (
            <div>
                <div className="Top">
                    This is the top component
                    <div>
                        {ms}
                    </div>
                </div>
                <div className="Bottom">
                    <Player
                        token={props.token}
                        track={currentTrack}
                        player={player}
                        pause={pause}
                        shuffle={shuffle}
                        repeat={repeat}
                        volume={volume}
                    />
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                Please transfer playback to the Web SDK
            </div>
        )
    }
}
export default Canvas;