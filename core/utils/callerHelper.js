import { seekCloseBracket } from './scriptProcessing.js'
import fs from 'fs'

export function getCallerPosition(traceBackLevel = 4) {
  const stackTrace = (new Error()).stack;
  const lines = stackTrace?.split('\n');
  const tokens = lines[traceBackLevel + 1]?.split(':');
  
  if (!tokens?.length >= 4)
    return null;

  let columnStr = tokens?.[tokens.length - 1]; 
  if (columnStr.endsWith(')'))
    columnStr = columnStr.substring(0, columnStr.length - 1);

  const column = Number(columnStr);
  const row = Number(tokens[tokens.length - 2]);

  let path1 = tokens[tokens.length - 4];
  path1 = path1.substring(path1.length - 1);
  const path2 = tokens[tokens.length - 3];

  const filePath = `${path1}:${path2}`
  return { row, column, filePath };
}

export function getCallerIndexRange(traceBackLevel = 4) {
  const { filePath, row, column } = getCallerPosition(traceBackLevel);
  const fileContent = fs.readFileSync(filePath).toString();

  let rowIndex = 0;
  for (let i = 1; i < row; i++)
    rowIndex = fileContent.indexOf('\n', rowIndex+1);

  let startIndex = rowIndex + column;
  
  const firstBracketIndex = fileContent.indexOf('(', startIndex);
  let endIndex = seekCloseBracket(fileContent, firstBracketIndex); 

  while (endIndex < fileContent.length - 1) {
    if ([';', ' ', '\t', '\r'].includes(fileContent[endIndex+1])) {
      endIndex++;
    }
    else if (fileContent[endIndex+1] === '\n') {
      endIndex++;
      break;
    }
    else 
      break;
  }

  return {
    filePath,
    fileContent,
    startIndex,
    endIndex,
  }
}

/** @deprecated */
export function removeCallerCode() {
  const { startIndex, endIndex, fileContent, filePath } = getCallerIndexRange();

  const newFileContent = fileContent.substring(0, startIndex) + fileContent.substring(endIndex + 1)
  fs.writeFileSync(filePath, newFileContent);
}


/** @deprecated */
export function replaceCallerCodeWithBlank() {
  const { startIndex, endIndex, fileContent, filePath } = getCallerIndexRange();
  let blank = "";
  for (let i=0; i < endIndex - startIndex + 1; i++)
    blank += " ";

  const newFileContent = fileContent.substring(0, startIndex) + blank + fileContent.substring(endIndex + 1)
  fs.writeFileSync(filePath, newFileContent);
}