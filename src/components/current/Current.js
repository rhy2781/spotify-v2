import React, { useEffect, useState } from "react";

import './Current.css'

function Current(props) {

    const [artists, setArtists] = useState([])

    useEffect(() => {
        const temp = props.track.artists.map((element, index) => (
            <div key={index} className="Artist">
                {element.name},
            </div>
        ));

        setArtists(temp);

    }, [props.track])

    return (
        <div className="Current">
            <div className="CurrentImageContainer">
                <img
                    src={props.track.album.images[0].url}
                    className="CurrentImage"
                />
            </div>
            <div className="CurrentDetails">
                <div className="CurrentTrack">
                    {props.track.name}
                </div>
                <div className="CurrentArtists">
                    {artists}
                </div>
            </div>
        </div>
    )
}
export default Current