/**
 * Capitalizes first letter of a string.
 *
 * @param {string} input Input string.
 * @return {string} Returns string with first letter capitalized.
 */

export const capitalize = (input) =>
  input.charAt(0).toUpperCase() + input.slice(1);

/**
 * Capitalizes first letter of each word.
 *
 * @param {string} input Input string.
 * @return {string} Returns words with first letter capitalized.
 */
export const capitalizeWords = (input) =>
  input.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
