import fs from 'fs'
import { runTests } from './core/autotest.js'
import { openVsCode, runSetUp } from './core/setup.js';

function main() {
  console.clear();
  let currentProblem = null;
  
  try {
    currentProblem = JSON.parse(fs.readFileSync('./current/problem.json'));
  }
  catch(error) {
    console.error("Cannot read current problem data.");
    console.error(error);
    return;
  }
  let { problemId } = currentProblem ?? {} 

  if (!problemId) {
    console.error(`The current problem ID is not provided.`);
    console.error(`Please run "npm run problem <your-problem-id>" to initialize your new solution!`);
    return;
  }

  if (!fs.existsSync(`./problems/${problemId}`)) {
    console.error(`The solution folder for problem ${problemId} does not exist.`);
    console.error(`Please run "npm run problem ${problemId}" to initialize your new solution!`);
    return;
  }
  
  Promise.all([
    import(`./problems/${problemId}/configs.js`),
    import(`./problems/${problemId}/solution.js`),
    import(`./problems/${problemId}/testcases.js`),
  ])
    .then(([configs, solution, { testcases }]) => {
      runTests(problemId, solution.default, testcases, configs)
    })
    .catch(error => {
      console.error("Import solution failed.");
      console.error(error);
    })
}

main();