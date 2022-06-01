import { runSetUp, openVsCode } from "./core/setup.js"

const problemId = process.argv[2];
runSetUp(problemId);
openVsCode(problemId);

console.info("Ready to code!");