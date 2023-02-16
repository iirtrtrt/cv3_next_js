export function numToKor(num) {
  if (num < 10000) {
    if (num < 1000) {
      return num.toString();
    } else {
      num = num.toString();
      num = num.slice(0, 1) + "," + num.slice(1);

      return num;
    }
  } else {
    const units = ["만", "억", "조"];

    let i = -1;
    while (num >= 10000) {
      i = i + 1;
      num = num / 10000;
    }
    num = Math.round(num * 100) / 100;

    if (num >= 10) {
      num = Math.round(num * 10) / 10;
    }

    num = num.toString() + units[i];
    return num;
  }
}
