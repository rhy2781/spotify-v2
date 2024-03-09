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

        /* style for volume input range */
        // slider remains green during input
        const slider = document.querySelector(".VolumeInputSlider")
        const handleSliderInput = (event) => {
            var temp = (event.target.valueAsNumber / 1) * 100
            slider.style.background = `linear-gradient(to right, #44c767 ${temp}%, #535353 ${temp}%)`
        };
        slider.addEventListener("input", handleSliderInput)

        // slider turns green when mouse over
        const container = document.querySelector(".VolumeInputContainer")
        container.addEventListener("mouseenter", () => {
            var temp = (slider.valueAsNumber / 1) * 100
            slider.style.background = `linear-gradient(to right, #44c767 ${temp}%, #535353 ${temp}%)`
        })

        //slider turns white when mouse leave
        container.addEventListener("mouseleave", () => {
            var temp = (slider.valueAsNumber / 1) * 100
            slider.style.background = `linear-gradient(to right, #ffffff ${temp}%, #535353 ${temp}%)`
        })

        return () => {
            slider.removeEventListener("input", handleSliderInput);
        }

    }, [props.volume])

    useEffect(() => {
        const slider = document.querySelector(".VolumeInputSlider")
        const temp = slider.valueAsNumber * 100
        slider.style.background = `linear-gradient(to right, #ffffff ${temp}%, #535353 ${temp}%)`;
    }, [])


    const handleVolume = (i) => {
        props.setVolume(i)
        props.player.setVolume(i)
    }


    return (
        <div className="SideControl">
            {icon}
            <div className="VolumeInputContainer">
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
            </div>

            {/* <div className="VolumeContainer">
                <div className="VolumeSlider" style={{ width: `${props.volume * 100}%`}}>
                </div>
            </div> */}
        </div>
    )
}

export default SideControl