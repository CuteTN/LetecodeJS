export function runTests(
  problemId,
  solution, 
  testcases, 
  {
    EPSILON, 
    SHOW_PASSED_TESTCASES,
    ENABLE_TYPE_CHECK,
    TERMINATE_ON_FAIL,
    customCheckEqual,
    customMapInput,
  }
) {
  function defaultCheckEqual(value1, value2) {
    if (value1 === value2)
      return true;

    if (value1 == value2 && !ENABLE_TYPE_CHECK)
      return true;
    
    // if the values were floating numbers  
    if (
      typeof value1 === "number" && typeof value2 === "number" &&
      !(Number.isSafeInteger(value1) && Number.isSafeInteger(value2))
    )
      return Math.abs(value1 - value2) < EPSILON;

    if (Array.isArray(value1) && Array.isArray(value2))
      return value1.length === value2.length && value1.every((v, i) => defaultCheckEqual(v, value2[i]));

    if (typeof value1 === "object" && typeof value2 === "object") {
      return defaultCheckEqual(
        Object.entries(value1 ?? {}).sort(([key1], [key2]) => key1.localeCompare(key2)), 
        Object.entries(value2 ?? {}).sort(([key1], [key2]) => key1.localeCompare(key2)), 
      );
    }

    return false;  
  }

  console.clear();

  if (typeof solution === "function") {
    let allPassed = true;

    for (let i=0; i<testcases.length; i++) {
      const testcase = testcases[i];
      const input = customMapInput?
        customMapInput(testcase.input)
        :
        testcase.input

      const startTime = performance.now();
      const actualOutput = solution(...(input ?? []));
      const endTime = performance.now();

      const isEqual = customCheckEqual? 
        customCheckEqual(testcase.output, actualOutput, defaultCheckEqual) 
        : 
        defaultCheckEqual(testcase.output, actualOutput)

      if (isEqual) {
        if (SHOW_PASSED_TESTCASES)
          console.info(`🟢 Testcase #${i}: PASSED! - ${(endTime - startTime).toFixed(3)}ms`);
      } else {
        allPassed = false;
        console.error(`🔴 Testcase #${i}: FAILED!`);
        console.error('Input: ', JSON.stringify(testcase.input));
        console.error('Expected output: ', JSON.stringify(testcase.output));
        console.error('Actual output: ', JSON.stringify(actualOutput));
        console.info();

        if (TERMINATE_ON_FAIL)
          break;
      }
    };

    console.info('----------------------------------');
    console.info(`Problem ID: ${problemId}`);
    console.info(allPassed? "🟢 PASSED 🟢":"🔴 FAILED 🔴")
  }
  else
    console.error("Please export solution function!")
}