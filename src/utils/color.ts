export const getRandomFlatColor = (minIntensity = 150, maxIntensity = 255) => {
  const r = Math.floor(Math.random() * (maxIntensity - minIntensity + 1)) + minIntensity;
  const g = Math.floor(Math.random() * (maxIntensity - minIntensity + 1)) + minIntensity;
  const b = Math.floor(Math.random() * (maxIntensity - minIntensity + 1)) + minIntensity;

  const hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

  return hexColor;
};
