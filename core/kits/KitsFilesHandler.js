import fs from 'fs'
import { replaceRangeOfString } from '../utils/stringHelper.js';

export class KitsFilesHandler {
  /** 
   * @description A dictionary from filenames to their new content
   * @type {Object<string, string>}
   */
  #changedFiles

  constructor() {
    this.#changedFiles = {};
  }

  #readFile(filePath) {
    if (fs.existsSync(filePath))
      return fs.readFileSync(filePath).toString();
    else
      return "";
  }

  /**
   * @param {string} filePath 
   * @returns {string}
   */
  getFileContent(filePath) {
    if (this.#changedFiles[filePath] == null)
      this.#changedFiles[filePath] = this.#readFile(filePath);
    return this.#changedFiles[filePath];
  }

  /**
   * @param {string} filePath 
   * @param {string | (currentContent: string) => string} newContent 
   * @returns {string} returns new file content
   */
  updateFileContent(filePath, newContent) {
    if (typeof newContent === "string")
      this.#changedFiles[filePath] = newContent;
    else if (typeof newContent === "function")
      this.#changedFiles[filePath] = newContent(this.getFileContent(filePath));
    
    return this.#changedFiles[filePath];
  }

  appendFileContent(filePath, appendedContent) {
    this.updateFileContent(filePath, content => content + appendedContent);
  }

  replaceContentRange(filePath, startIndex, endIndex, replaceWithContent) {
    this.updateFileContent(filePath, content => replaceRangeOfString(content, startIndex, endIndex, replaceWithContent));
  }

  commit() {
    Object.entries(this.#changedFiles).forEach(([filePath, newContent]) => {
      fs.writeFileSync(filePath, newContent);
    })
  }
}