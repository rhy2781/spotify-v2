import { React, useEffect, useState } from "react"

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
    }, [progress])

    useEffect(() => {
        const durationMin = Math.floor((props.durationMS / 1000) / 60)
        const durationSec = Math.floor((props.durationMS / 1000) % 60)
        setDurationString(`${durationMin}:${durationSec.toString().padStart(2, '0')}`)
    }, [props.durationMS])

    return (
        <div>
            <div>
                {progressString}
            </div>
            <div className="SliderEncased" style={{ width: "100vw" }}>
                <input
                    style={{ width: "100vw" }}
                    className="SliderInput"
                    type="range"
                    min={0}
                    max={1}
                    step={"any"}
                    value={progressPercentage}
                // onChange={event => handleSeek(event.target.valueAsNumber)}
                />
            </div>
            <div>
                {durationString}
            </div>
        </div>

    )


}

export default ProgressBar