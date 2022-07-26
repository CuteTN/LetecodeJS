/**
 * @param {string} script 
 * @param {number} openBracketIndex 
 */
export function seekCloseBracket(script, openBracketIndex) {
  const openChars = ["'", '`', `"`, '(', '//', '/*']
  const stringOpenChars = ["'", '`', `"`]
  const commentOpenChars = ['//', '/*']
  
  /** @type {"string" | "comment" | "normal"} */
  let state = "normal"
  let flagIgnoreLastChar = false;
  let flagSkipNextChar = false;
  
  let stack = [];
  let i = openBracketIndex
  const getStackTop = () => stack?.[stack.length - 1];
  const isMatchBracketPair = (openChar, closeChar) => {
    switch (openChar) {
      case '(': return closeChar === ')'
      case '//': return closeChar === '\n'
      case '/*': return closeChar === '*/'
      case "'": case '\`': case `"`: return closeChar === openChar
      default: return false;
    }
  }

  for (; i < script.length; i++) {
    if (flagSkipNextChar) {
      flagSkipNextChar = false;
      continue;
    }
    const stackTop = getStackTop();
    const current = script[i];
    const current2 = flagIgnoreLastChar? undefined : (script[i-1] + script[i]);

    if (state === "normal") {
      if (openChars.includes(current))
        stack.push(current)
      else if (isMatchBracketPair(stackTop, current))
        stack.pop();

      if (stringOpenChars.includes(current))
        state = "string";

      if (commentOpenChars.includes(current2)) {
        stack.push(current2);
        state = "comment";
      }
    }
    else if (state === "string") {
      if (isMatchBracketPair(stackTop, current)) {
        state = "normal",
        stack.pop();
      }
      if (current === '\\')
        flagSkipNextChar = true;
    }
    else if (state === "comment") {
      if (isMatchBracketPair(stackTop, current) || isMatchBracketPair(stackTop, current2)) {
        stack.pop();
        state = "normal";

        if (current2 === "*/")
          flagIgnoreLastChar = true;
      }
    }

    if (stack.length === 0)
      return i;
  }

  return i
}