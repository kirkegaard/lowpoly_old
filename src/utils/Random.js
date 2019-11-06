export const Random = (min, max, floor) => {
  let num = Math.random() * (max - min) + min;
  return (floor) ? Math.floor(num) : num;
}
