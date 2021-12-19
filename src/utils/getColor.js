// Accepts hex or name of css variable color
export const getColor = (hexOrCssColor, fallback = undefined) => {
  const input = hexOrCssColor?.trim?.() ?? hexOrCssColor;

  return input && input[0] === "#"
    ? input
    : getComputedStyle(document.documentElement).getPropertyValue(
        `--snt-color-${input}`
      ) ??
        getComputedStyle(document.documentElement).getPropertyValue(
          `--snt-color-${fallback}`
        ) ??
        fallback;
};
