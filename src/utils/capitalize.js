/**
 * Capitalizes first letter of a string.
 *
 * @param {string} input Input string.
 * @return {string} Returns string with first letter capitalized.
 */

export const capitalize = (input) =>
  input.charAt(0).toUpperCase() + input.slice(1);
