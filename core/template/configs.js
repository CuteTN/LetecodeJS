// @ts-check
import '../../core/types.js'

export const EPSILON = 1e-6;
export const ENABLE_TYPE_CHECK = true;
export const SHOW_PASSED_TESTCASES = true;
export const TERMINATE_ON_FAIL = true;

/** @type CheckEqualFunctionType */
export const customCheckEqual = (expOut, actOut, defaultCheckEqual) => {
  return !!defaultCheckEqual?.(expOut, actOut);
};

/** @type MapInputFunctionType */
export const customMapInput = (testcaseInput) => {
  return testcaseInput
}