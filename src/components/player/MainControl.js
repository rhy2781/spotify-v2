import React from "react";

import './MainControl.css'

function MainControl(props) {
    return (
        <div className="MainControl">
            These are teh controls
            <div onClick={() => {props.player.togglePlay()}}>
                {(props.pause) ? "Paused" : "Play"}
            </div>
        </div>
    )
}

export default MainControl