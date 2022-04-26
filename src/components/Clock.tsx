import React from "react";
import { formatTime } from "../utils/formatTime";
import { useInterval } from "../utils/useInterval";
import styles from "./Clock.module.css";

function Clock() {
  const [style, setStyle] = React.useState<React.CSSProperties>();
  const ref = React.useRef<HTMLDivElement>(null);

  const timestamp = useInterval(1000);
  const formatted = React.useMemo(() => formatTime(timestamp), [timestamp]);

  React.useEffect(() => {
    const width = ref.current?.offsetWidth;
    if (width) {
      setStyle({ width });
    }
  }, [formatted]);

  return (
    <div className={styles.container} style={style}>
      <div className={styles.clock} ref={ref}>
        {formatted}
      </div>
    </div>
  );
}

export default Clock;
