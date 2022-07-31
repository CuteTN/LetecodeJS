import { getCallerIndexRange } from "../utils/callerHelper.js";
import { libsData } from '../../userdata/libs.js'
import path from 'path'
import fs from 'fs'
import { kitsCore } from "../globals.js";

/**
 * @param {import("../../userdata/libs.js").LibIdsType[]} ids
 */
export function letePick(...ids) {
  let importedLibs = [];

  try {
    ids.forEach(id => {
      if (!libsData[id]) {
        throw `The ID:${id} doesn't exist. Did you forget to run commit-libs?`;
      }
      
      importedLibs.push(libsData[id]);
    })
  }
  catch (ex) {
    console.error(ex);
    return;
  }

  const callerRange = getCallerIndexRange(3);
  const script = importedLibs.map(lib => lib.script + "\r\n\r\n").join("");

  kitsCore.addTask({
    kitName: "letePick",
    action: "replace-range-file",
    isChangingFile: true,
    isInstant: true,
    params: {
      filepath: callerRange.filePath,
      startIndex: callerRange.startIndex,
      endIndex: callerRange.endIndex,
      replaceWith: script,
    }
  })
}