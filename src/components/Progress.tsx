import styles from "./Progress.module.css";

function Progress({ total, current }: { total: number; current: number }) {
  const percent = (current / total) * 100;

  return (
    <div className={styles.root}>
      <div className={styles.track} style={{ width: `${percent}%` }} />
    </div>
  );
}

export default Progress;
