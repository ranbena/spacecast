function pad(num: number): string {
  return (num < 10 ? "0" : "") + num;
}

/**
 * Formats timestamp into time "HH:MM" or "HH:MM:SS"
 *
 * @param timestamp
 * @param withSeconds whether to include seconds. Defaults to true.
 * @returns "HH:MM[:SS]"
 */
export function formatTime(timestamp: number, withSeconds = true) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let formatted = `${pad(hours)}:${pad(minutes)}`;

  if (withSeconds) {
    formatted += `:${pad(seconds)}`;
  }

  return formatted;
}

export function formatDate(date: Date, delimiter = "-") {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, pad(month), pad(day)].join(delimiter);
}
