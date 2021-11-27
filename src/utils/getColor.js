// Accepts hex or name of css variable color
export const getColor = (hexOrCssColor, fallback = undefined) =>
  hexOrCssColor && hexOrCssColor[0] === "#"
    ? hexOrCssColor
    : getComputedStyle(document.documentElement).getPropertyValue(
        `--snt-color-${hexOrCssColor}`
      ) ??
      getComputedStyle(document.documentElement).getPropertyValue(
        `--snt-color-${fallback}`
      ) ??
      fallback;
