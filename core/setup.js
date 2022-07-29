import fs from 'fs'
import { exec } from 'child_process'
import path from 'path'

const dirProblems = './problems';
const dirCurrent = './userdata/current';
const dirTemplate = './core/template';


function checkProblemId(problemId) {
  return problemId && /^[a-z0-9\-_]+$/i.test(problemId);
}


function setCurrentProblem(problemId) {
  if (!fs.existsSync(dirCurrent))
    fs.mkdirSync(dirCurrent);

  const currentProblemData = {
    problemId
  }

  fs.writeFileSync(`${dirCurrent}/problem.json`, JSON.stringify(currentProblemData, null, 2));
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


export function openVsCode(problemId) {
  const pathProblem = path.resolve(`${dirProblems}/${problemId}/solution.js`);
  exec(`code -r -g ${pathProblem}:5:3`)
}


export function runSetUp(problemId) {
  if (!checkProblemId(problemId)) {
    console.error("Please provide a valid problem ID")
    console.error("Syntax: npm run problem <your-problem-id>");
    return;
  }

  initializeNewProblem(problemId);
  setCurrentProblem(problemId);
}