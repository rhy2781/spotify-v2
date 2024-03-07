import { React, useEffect, useState } from "react";

function Temp(props) {

    const [display, setDisplay] = useState(props.ms)

    useEffect(() => {
        setDisplay(props.ms)
    }, [props.ms])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!props.pause) {
                const temp = display + 500;
                setDisplay(temp)
            }

        }, 500)

        return () => clearInterval(interval)
    }, [display, props.pause])

    return (
        <div>
            {display}
        </div>
    )
}

export default Temp