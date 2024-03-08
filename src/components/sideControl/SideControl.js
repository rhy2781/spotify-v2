import { React, useEffect, useState } from "react";
import { IoVolumeMuteSharp, IoVolumeOffSharp, IoVolumeLowSharp, IoVolumeMediumSharp, IoVolumeHighSharp } from "react-icons/io5";

import './SideControl.css'

function SideControl(props) {

    const [icon, setIcon] = useState(undefined)

    useEffect(() => {
        if (props.volume === 0) {
            setIcon(IoVolumeMuteSharp)
        }
        else if (props.volume < 0.25) {
            setIcon(IoVolumeOffSharp)
        }
        else if (props.volume < 0.50) {
            setIcon(IoVolumeLowSharp)
        }
        else if (props.volume < 0.75) {
            setIcon(IoVolumeMediumSharp)
        }
        else {
            setIcon(IoVolumeHighSharp)
        }

        // style for volume input range
        const sliderEl = document.querySelector(".VolumeInputSlider")
        const temp = (sliderEl.valueAsNumber / 1) * 100
        sliderEl.style.background = `linear-gradient(to right, #44c767 ${temp}%, #ccc ${temp}%`

    }, [props.volume])

    const handleVolume = (i) => {
        props.setVolume(i)
        props.player.setVolume(i)
    }


    return (
        <div className="SideControl">
            {icon}
            <input
                className="VolumeInputSlider"
                type="range"
                min={0}
                max={1}
                step={"any"}
                value={props.volume}
                onChange={event => {
                    handleVolume(event.target.valueAsNumber)
                }}
            />
            {/* <div className="VolumeContainer">
                <div className="VolumeSlider" style={{ width: `${props.volume * 100}%`}}>
                </div>
            </div> */}
        </div>
    )
}

export default SideControl