import fs from 'fs'
import { exec } from 'child_process'
import path from 'path'

const problemId = process.argv[2];
const dirProblems = './problems';
const dirCurrent = './current';
const dirTemplate = './core/template';


function checkProblemId(problemId) {
  return problemId && /^[a-z0-9\-_]+$/i.test(problemId);
}


function setCurrentProblem(problemId) {
  if (!fs.existsSync(dirCurrent))
    fs.mkdirSync(dirCurrent);

  const dirProblem = `.${dirProblems}/${problemId}`;
  fs.writeFileSync(`${dirCurrent}/problem.js`,
    `
import * as configs from "${dirProblem}/configs.js"
import solution from "${dirProblem}/solution.js"
import { testcases } from "${dirProblem}/testcases.js"
const problemId = "${problemId}"

export { configs, solution, testcases, problemId }
    `
  )
}


function initializeNewProblem(problemId) {
  if (!fs.existsSync(dirProblems))
    fs.mkdirSync(dirProblems);
  
  const dirProblemId = `${dirProblems}/${problemId}`;
  if (fs.existsSync(dirProblemId)) {
    console.info(`The problem ID "${problemId}" has already existed!`);
    return;
  }

  fs.mkdirSync(dirProblemId);

  fs.copyFileSync(`${dirTemplate}/configs.js`, `${dirProblemId}/configs.js`);
  fs.copyFileSync(`${dirTemplate}/solution.js`, `${dirProblemId}/solution.js`);
  fs.copyFileSync(`${dirTemplate}/testcases.js`, `${dirProblemId}/testcases.js`);
}


function openVsCode(problemId) {
  const pathProblem = path.resolve(`${dirProblems}/${problemId}/solution.js`);
  exec(`code -r -g ${pathProblem}:5:3`)
}


function runSetUp(problemId) {
  if (!checkProblemId(problemId)) {
    console.error("Please provide a valid problem ID")
    console.error("Syntax: npm run problem <your-problem-id>");
    return;
  }

  initializeNewProblem(problemId);
  setCurrentProblem(problemId);
  openVsCode(problemId);

  console.info("Ready to code!");
}

runSetUp(problemId);