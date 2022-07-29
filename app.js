import fs from 'fs'
import { runTests } from './core/autotest.js'
import { DEFAULT_PROBLEM_ID } from './core/constants/defaults.js';
import { kitsCore } from './core/globals.js';
import { openVsCode, runSetUp } from './core/setup.js';

function main() {
  console.clear();
  let currentProblem = null;
  
  try {
    currentProblem = JSON.parse(fs.readFileSync('./userdata/current/problem.json'));
  }
  catch(error) {
    console.error("Cannot read current problem data.");
    console.error(error);
    return;
  }
  let { problemId } = currentProblem ?? {} 

  if (!(problemId && fs.existsSync(`./problems/${problemId}`))) {
    runSetUp(DEFAULT_PROBLEM_ID);
    openVsCode(DEFAULT_PROBLEM_ID);
  }
  
  Promise.all([
    import(`./problems/${problemId}/configs.js`),
    import(`./problems/${problemId}/solution.js`),
    import(`./problems/${problemId}/testcases.js`),
  ])
    .then(([configs, solution, { testcases }]) => {
      console.clear();
      kitsCore.executeTasks();
      runTests(problemId, solution.default, testcases, configs)
    })
    .catch(error => {
      console.error("Import solution failed.");
      console.error(error);
    })
}

main();