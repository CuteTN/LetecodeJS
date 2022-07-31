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

/**
 * @param {string} source 
 * @param {string} searchedText
 * @param {string} replaceWith 
 * @returns {string}
 */
export function replaceAll(source, searchedText, replaceWith) {
  return source?.split(searchedText).join(replaceWith);
};

export function convertImportablePath(absolutePath) {
  return "file://" + replaceAll(absolutePath, '\\', '/');
}