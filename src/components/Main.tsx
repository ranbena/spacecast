import React from "react";
import { DatesT } from "../api";
import Globe from "./Globe";
import styles from "./Main.module.css";

function Main({ dates }: { dates: string[] }) {
  const [date, setDate] = React.useState(dates[0]); // TODO: save date selection to localstorage

  const onDateChange: React.ChangeEventHandler<HTMLSelectElement> =
    React.useCallback((event) => {
      setDate(event.target.value);
    }, []);

  return (
    <div className={styles.root}>
      <div className={styles.select}>
        <select value={date} onChange={onDateChange}>
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.globe}>
        <Globe date={date} key={date} />
      </div>
    </div>
  );
}

function MainController({ dates }: { dates: DatesT | undefined }) {
  const normalizedDates = React.useMemo(() => {
    return dates?.map(({ date }) => date);
  }, [dates]);

  if (!normalizedDates?.length) return null;

  return <Main dates={normalizedDates} />;
}

export default MainController;
