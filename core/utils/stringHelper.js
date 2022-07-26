/**
 * @param {string} source 
 * @param {number} startIndex 
 * @param {number} endIndex 
 * @param {string} replaceWith 
 * @returns {string}
 */
export function replaceRangeOfString(source, startIndex, endIndex, replaceWith = "") {
  return source.substring(0, startIndex) + replaceWith + source.substring(endIndex + 1)
}