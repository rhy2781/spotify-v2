import React from "react";
import Player from "../player/Player";

import './Canvas.css'

function Canvas(props) {
    return (
        <div>
            <div className="Top">
                This is the top component
            </div>
            <div className="Bottom">
                <Player token={props.token} />
            </div>
        </div>
    )
}
export default Canvas;