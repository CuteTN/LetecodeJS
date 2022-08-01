import { getCallerIndexRange } from "../utils/callerHelper.js";
import { libsData } from '../../userdata/libs.js'
import { kitsCore } from "../globals.js";

class DependenciesTracer {
  /** @type {Set<string>} */
  #visitedIds = new Set();
  #libsData;

  constructor(libsData) {
    this.#libsData = libsData;
    this.reset();
  }

  reset() {
    this.#visitedIds.clear(); 
  }

  isVisitedId(id) {
    return this.#visitedIds.has(id)
  }

  traceFrom(id) {
    if ((!id) || this.isVisitedId(id))
      return;

    const libData = this.#libsData[id]
    if (!libData)
      throw `The ID:${id} doesn't exist. Did you forget to run commit-libs?`;
    
    this.#visitedIds.add(id);
    
    if (libData.dependencyIds?.length) {
      libData.dependencyIds.forEach(_id => {
        if (id && !this.isVisitedId(_id))
          this.traceFrom(_id);
      })
    }
  }

  #getPriority(item) {
    switch (item?.type) {
      case "var": return 2;
      case "class": return 1;
      case "function": return 0;
      default: return 99999;
    }
  }

  getResult() {
    const result = []
    this.#visitedIds.forEach(id => {
      result.push(this.#libsData[id]);
    })

    result.sort((a,b) => this.#getPriority(b) - this.#getPriority(a));

    return result;
  }
}

/**
 * 😼 Summary: **letePick** lets you grab a piece of code from your personal library instead of reaching the source code by yourself.  
 * 😼 Usage: call **letePick** from your *solution* file. After the call, the caller code should be replaced by the requested piece of code automatically.  
 * 😼 Usage: create a new file in *userlibs* folder to create a new ***library***. In the file, you should export everything that you would need to copy later (and please, do NOT export default). vars, classes and functions are supported. However there are constrains on the syntax:  
 *    - functions: it is highly recommended that you use the syntax `function funcName() {}` for declaring functions.  
 *    - classes: it is also recommended that you use the syntax `class className {}` for declaring classes.  
 *    - vars: you can declare your data with either *const*, *let*, *var*. But the tool will see all of them as "*var*"s.  
 * After making changes on libraries, you need to re-run the tool with `npm start` to commit those new changes to the tool.  
 * 
 * @param {import("../../userdata/libs.js").LibIdsType[]} ids
 */
export function letePick(...ids) {
  let importedLibs = [];

  try {
    const tracer = new DependenciesTracer(libsData);
    ids.forEach(id => tracer.traceFrom(id));
    importedLibs = tracer.getResult();
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