import React, { useEffect, useState, useRef } from "react";
import styles from "./Clock.module.css";

function Clock() {
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);

    const [width, setWidth] = useState<number>();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const today: Date = new Date();
        setHours(today.getHours());
        setMinutes(today.getMinutes());
        setSeconds(today.getSeconds());
    }, []);

    useEffect(() => {
        const interval: NodeJS.Timer = setInterval(() => {
            if (seconds < 59) {
                setSeconds((seconds) => seconds + 1);
            } else {
                setSeconds(0);
                if (minutes < 59) {
                    setMinutes((minutes) => minutes + 1);
                } else {
                    setMinutes(0);
                    if (hours < 23) {
                        setHours((hours) => hours + 1);
                    } else {
                        setHours(0);
                    }
                }
            }
            // Storing new clock width in state
            null !== ref.current && setWidth(ref.current.offsetWidth);
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds, minutes, hours, width]);

    // set new width to container width from state and animate
    const style = React.useMemo(
        () => ({
            width: `${width}px`,
            transition: "width 0.5s",
        }),
        [width]
    );

    return (
        <div className={styles.container} style={style}>
            <div className={styles.clock} ref={ref}>
                {hours < 10 ? `0${hours}` : hours}:
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
            </div>
        </div>
    );
}

export default Clock;
