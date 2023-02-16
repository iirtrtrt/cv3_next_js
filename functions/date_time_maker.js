export function dateMaker(date) {
  return (
    "20" + date.slice(0, 2) + "." + date.slice(2, 4) + "." + date.slice(4, 6)
  );
}

export function timeMaker(time) {
  return time.slice(6, 8) + ":" + time.slice(8, 10);
}
