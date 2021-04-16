export default function getRandomInt(min, max, withMinus = false) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let random = Math.floor(Math.random() * (max - min)) + min;
  if (withMinus) {
    let sign = Math.random() < 0.5 ? -1 : 1;
    random = (Math.floor(Math.random() * (max - min)) + min) * sign;
  }
  return random;
}
