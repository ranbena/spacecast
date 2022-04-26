import React from "react";

export function useInterval(interval: number) {
  const [now, setNow] = React.useState(Date.now());

  React.useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(intervalId);
  }, [interval]);

  return now;
}
