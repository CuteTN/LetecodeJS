import fs from 'fs'
import path from 'path';
import { convertImportablePath } from '../utils/stringHelper.js';

/**
 * @typedef {"var" | "class" | "function"} LibItemTypeType
 * 
 * @typedef {Object} LibItemType
 * @property {string} name
 * @property {LibItemTypeType} type
 * @property {string} script
 * @property {string} fileName
 * @property {string} id
 */

/**
 * @param {*} item 
 * @returns {LibItemType} 
 */
function getItemDetails(fileName, itemName, itemValue) {
  const id = `${itemName} [${fileName}]`

  if (typeof itemValue === "function") {
    const script = itemValue.toString();
    let type;
    
    if (script.startsWith("function"))
      type = "function";
    if (script.startsWith("class"))
      type = "class"
    
    return { 
      name: itemName, 
      script,
      type, 
      id,
      fileName,
    }
  }

  const valueAsString = itemValue === undefined? "undefined" : JSON.stringify(itemValue);

  return {
    name: itemName,
    script: `var ${itemName} = ${valueAsString}`,
    type: "var",
    id,
    fileName,
  };
}

/**
 * @param {string} libsPath The directory to import
 * @returns {Promise<Object<string, LibItemType>>}
 */
export async function convertLibsScriptToData(libsPath) {
  if (!libsPath.endsWith('\\'))
    libsPath += '\\';

  const fileNames = fs.readdirSync(libsPath);
  const libsImportablePath = convertImportablePath(path.resolve(libsPath)) + '/';
  
  /** @type {Object<string, LibItemType>} */
  const result = {}

  for (let fileName of fileNames) {
    const importedContent = await import(libsImportablePath + fileName);
    
    Object.entries(importedContent).forEach(([itemName, itemValue]) => {
      const itemDetail = getItemDetails(fileName, itemName, itemValue);
      result[itemDetail.id] = itemDetail
    })
  }

  return result;
}

/**
 * @param {Object<string, LibItemType>} libsData 
 */
export function commitLibsData(libsData) {
  const libsDataContent = "export const libsData = " + JSON.stringify(libsData, null, 2);

  const ids = Object.keys(libsData);

  const idAsString = ids.map(id => `"${id}"`).join(' | \r\n');
  const libsIdsTypeContent = `/** @typedef {\r\n${idAsString}\r\n} LibIdsType */`

  const content = [libsDataContent, libsIdsTypeContent].join('\r\n');
  fs.writeFileSync('./userdata/libs.js', content);
}