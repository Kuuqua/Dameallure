export function toggleValue(array, value) {
  return array.includes(value)
    ? array.filter((item) => item !== value)
    : [...array, value];
}
