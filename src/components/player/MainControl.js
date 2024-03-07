import { React, useState, useEffect } from "react";
import { IoPlaySharp, IoPauseSharp, IoShuffleSharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5"
import { LuRepeat, LuRepeat1 } from "react-icons/lu"

import './MainControl.css'

function MainControl(props) {

    const [progressString, setProgressString] = useState('temp')
    const [durationString, setDurationString] = useState('temp')
    const [durationMS, setDurationMS] = useState(0)
    const [progressPercentage, setProgressPercentage] = useState(0.0)


    async function toggleShuffle() {
        await fetch(`${process.env.REACT_APP_BACKEND}/player/shuffle`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'state': props.shuffle })
        })
    }

    async function toggleRepeat() {
        await fetch(`${process.env.REACT_APP_BACKEND}/player/repeat`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'state': props.repeat })
        })
    }

    async function update() {
        await fetch(`${process.env.REACT_APP_BACKEND}/player/update`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((response) => {
                setProgressString(response.progressString)
                setDurationString(response.durationString)
                setDurationMS(response.durationMS)
                setProgressPercentage(response.progressPercentage)
            })
    }

    return (
        <div className="MainControl">
            <div className="Controls">
                <div className="Shuffle" onClick={() => toggleShuffle()} >
                    {props.shuffle ? <IoShuffleSharp /> : <IoShuffleSharp style={{ color: "#1DB954" }} />}
                </div>
                <div className="SkipBackward" onClick={() => { props.player.previousTrack() }}>
                    <IoPlaySkipBackSharp />
                </div>
                <div className="Play" onClick={() => { props.player.togglePlay() }}>
                    <div className="PlayButton">
                        {(props.pause) ? <IoPlaySharp /> : <IoPauseSharp />}
                    </div>
                </div>
                <div className="SkipForward" onClick={() => { props.player.nextTrack() }}>
                    <IoPlaySkipForwardSharp />
                </div>
                <div className="Repeat" onClick={() => toggleRepeat()}>
                    {props.repeat === 0 ? <LuRepeat className="RepeatIcon" /> : props.repeat === 1 ? <LuRepeat className="RepeatIcon" style={{ color: "#1DB954" }} /> : <LuRepeat1 className="RepeatIcon" style={{ color: "#1DB954" }} />}
                </div>
            </div>


            
            <div className="ProgressBar" onClick={() => update()} style={{ outline: 'white dotted 1px' }}>
                <div>
                    {progressString}
                </div>
                <div>
                    Temp
                </div>
                <div>
                    {durationString}
                </div>
            </div>
        </div>
    )
}

export default MainControl