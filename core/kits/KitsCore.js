/**
 * @typedef {"replace-range-file" | "append-file" | "write-file" } KitActionsType
 * @typedef {{ filepath?: string, startIndex?: number, endIndex?: number, replaceWith?: string, appendWith?: string }} KitParamsType
 */

/** 
 * @typedef {Object} KitTaskType 
 * @property {string} kitName
 * @property {KitActionsType} action
 * @property {boolean} isInstant true if the action will be executed right on the next save
 * @property {boolean} isChangingFile true if the action is about to change a file once executed
 * @property {KitParamsType} params
*/

import { KitsFilesHandler } from "./KitsFilesHandler.js";

export class KitsCore {
  constructor() {
    this.#tasks = [];
  }  

  /** @type {KitTaskType[]} */
  #tasks;
  
  /** @type {KitsFilesHandler} */
  #filesHandler;
  
  /** @param {KitsFilesHandler} value */
  set fileHandler(value) {
    this.#filesHandler = value;
  }
  
  /**
   * @param {KitTaskType} task 
   */
  addTask(task) {
    if (task) this.#tasks.push(task)
  }

  executeTasks() {
    if (!this.#tasks.length) return;

    /** @type {KitTaskType[]} */
    const appendFileTasks = [];
    /** @type {KitTaskType[]} */
    const replaceRangeFileTasks = [];

    this.#tasks.forEach(task => {
      if (task.action === "append-file")
        appendFileTasks.push(task);
      if (task.action === "replace-range-file")
        replaceRangeFileTasks.push(task);
    })

    replaceRangeFileTasks.sort((task1, task2) => task2.params.startIndex - task1.params.startIndex);
    for (let i=0; i<replaceRangeFileTasks.length; i++) {
      for (let j=i+1; j<replaceRangeFileTasks.length; j++) {
        if (replaceRangeFileTasks[j].params.endIndex > replaceRangeFileTasks[i].params.startIndex)
          throw "Nested call of kits is not allowed."
      }
    }

    replaceRangeFileTasks.forEach(task => {
      this.#filesHandler.replaceContentRange(
        task.params.filepath, 
        task.params.startIndex,
        task.params.endIndex,
        task.params.replaceWith,
      )
    })

    appendFileTasks.forEach(task => {
      this.#filesHandler.appendFileContent(
        task.params.filepath,
        task.params.appendWith,
      )
    })

    this.#filesHandler.commit();
  }
}