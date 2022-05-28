import { configs, solution, testcases, problemId } from './current/problem.js'
import { runTests } from './core/autotest.js'

runTests(problemId, solution, testcases, configs);