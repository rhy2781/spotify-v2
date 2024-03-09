import { React, useEffect, useState } from "react"
import './ProgressBar.css'

function ProgressBar(props) {
    const [progress, setProgress] = useState(props.ms)
    const [progressPercentage, setProgressPercentage] = useState(0)
    const [progressString, setProgressString] = useState("")
    const [durationString, setDurationString] = useState("")

    useEffect(() => {
        setProgress(props.ms)
    }, [props.ms])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!props.pause) {
                const temp = progress + 500;
                setProgress(temp)
            }

        }, 500)

        return () => clearInterval(interval)
    }, [progress, props.pause])

    useEffect(() => {
        const progressMin = Math.floor((progress / 1000) / 60)
        const progressSec = Math.floor((progress / 1000) % 60)
        setProgressPercentage(progress / props.durationMS)
        setProgressString(`${progressMin}:${progressSec.toString().padStart(2, '0')}`)
    }, [progress, props.durationMS])

    useEffect(() => {
        const durationMin = Math.floor((props.durationMS / 1000) / 60)
        const durationSec = Math.floor((props.durationMS / 1000) % 60)
        setDurationString(`${durationMin}:${durationSec.toString().padStart(2, '0')}`)
    }, [props.durationMS])

    function handleSeek(i) {
        const seek_to = Math.floor(props.durationMS * i);
        props.player.togglePlay();
        props.player.seek(seek_to);
        setProgressPercentage(seek_to / props.durationMS);
        props.player.togglePlay();
    }

    // adjusting css for progress slider
    // const sliderEl = document.querySelector(".ProgressInputSlider")
    // const temp = (sliderEl.valueAsNumber / 1) * 100
    // sliderEl.style.background = `linear-gradient(to right, #ffffff ${temp}%, #535353 ${temp}%`

    return (
        <div className="ProgressBar">
            <div>
                {progressString}
            </div>
            <div className="SliderEncased">
                <input
                    className="ProgressInputSlider"
                    type="range"
                    min={0}
                    max={1}
                    step={"any"}
                    value={progressPercentage}
                    onChange={event => handleSeek(event.target.valueAsNumber)}
                />
            </div>
            <div>
                {durationString}
            </div>
        </div>

    )


}

export default ProgressBar