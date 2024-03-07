import React from "react";
import Current from "./Current";
import MainControl from "./MainControl";
import SideControl from "./SideControl";

import './Player.css'

function Player(props) {


    return (
        <div className="Player">
            <Current track={props.currentTrack} />
            <MainControl
                player={props.player}
                pause={props.pause}
                shuffle={props.shuffle}
                repeat={props.repeat}
                durationMS={props.durationMS}
                ms={props.ms}
            />
            <SideControl />
        </div>
    )
}

export default Player