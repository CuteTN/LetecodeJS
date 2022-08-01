import { getCallerIndexRange } from "../utils/callerHelper.js";
import path from 'path'
import fs from 'fs'
import { kitsCore } from "../globals.js";

/**
 * 😼 Summary: **leteTest** lets you add a new testcase without having to switch to the testcases file.  
 * 😼 Usage: call **leteTest** from your *solution* file. After the call, a new testcase would be added, then the caller code should be removed automatically.  
 * 
 * @param {number} id
 * @param {any[]} input 
 * @param {any} output 
 */
export function leteTest(id, input, output) {
  if (!Number.isInteger(id)) {
    console.error("Test ID is required and must be an integer.");
    return;
  }
  if (!Array.isArray(input)) {
    console.error("The input must be an array.");
    return;
  }
    
  const callerRange = getCallerIndexRange(3);
  const dirName = path.dirname(callerRange.filePath);
  const testcasesPath = `${dirName}/testcases.js`;

  if (!fs.existsSync(testcasesPath)) {
    console.error("The testcases file doesn't exist.")
    return;
  }

  const insertTestcaseCode = [
    "",
    `if (testcases.every(testcase => testcase.id !== ${id}))`,
    `  testcases.push(`,
    `    ${JSON.stringify({ id, input, output })}`,
    `  )\n`
  ].join('\n')

  kitsCore.addTask({
    kitName: "leteTest",
    action: "append-file",
    isChangingFile: true,
    isInstant: true,
    params: {
      filepath: testcasesPath,
      appendWith: insertTestcaseCode
    }
  });

  kitsCore.addTask({
    kitName: "leteTest",
    action: "replace-range-file",
    isChangingFile: true,
    isInstant: true,
    params: {
      filepath: callerRange.filePath,
      startIndex: callerRange.startIndex,
      endIndex: callerRange.endIndex,
      replaceWith: "",
    }
  })
}