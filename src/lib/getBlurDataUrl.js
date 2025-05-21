export function getBlurDataUrl(theme = "light") {
  const svg =
    theme === "dark"
      ? `<svg width="320" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="rgba(31,41,55,0.4)" /></svg>`
      : `<svg width="320" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="rgba(228,228,228,0.4)" /></svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
