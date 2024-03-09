import { React, useState, useEffect } from "react";

import './Canvas.css'
import ProgressBar from "../progressBar/ProgressBar";
import Current from "../current/Current";
import MainControl from "../mainControl/MainControl";
import SideControl from "../sideControl/SideControl";


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

    const [progressMS, setProgressMS] = useState(0)
    const [durationMS, setDurationMS] = useState(0)

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
                volume: 0.5
            });

            setVolume(0.5);
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
                player.getVolume().then((v) => setVolume(v))

                setProgressMS(state.position)
                setDurationMS(state.track_window.current_track.duration_ms)
                player.getCurrentState().then((state) => {
                    (!state) ? setActive(false) : setActive(true)
                });
            }));
            player.connect();
        };

        //     // setInterval(progress, 1000); // Update every half second
        window.addEventListener('beforeunload', () => player.disconnect()); // disconnect player on reload
        window.addEventListener('close', () => player.disconnect()); // disconnect player when window closes
        return () => {
            window.removeEventListener('beforeunload', () => player.disconnect());
            window.removeEventListener('close', () => player.disconnect());
            player.disconnect();
        };
        // eslint-disable-next-line
    }, [props.token]);

    if (active) {
        return (
            <div>
                <div className="Top">
                    This is the top component
                </div>
                <div className="Player">
                    <Current
                        track={currentTrack}
                    />
                    <div className="Controls">
                        <MainControl
                            player={player}
                            pause={pause}
                            shuffle={shuffle}
                            repeat={repeat}
                            durationMS={durationMS}
                            ms={progressMS}
                        />
                        < ProgressBar
                            player={player}
                            pause={pause}
                            durationMS={durationMS}
                            ms={progressMS}
                        />
                    </div>
                    <SideControl
                        player={player}
                        volume={volume}
                        setVolume={setVolume}
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