import fs from 'fs'

function initializeApp() {
  function initDir(path) {
    if (!fs.existsSync(path))
      fs.mkdirSync(path);
  }

  function initFile(path, content = "") {
    if (!fs.existsSync(path))
      fs.writeFileSync(path, content);
  }
  
  initDir('./problems')
  
  initDir('./userdata')
  initDir('./userdata/current')
  initFile('./userdata/current/problem.json', '{}')
  initFile('./userdata/libs.js', "export const libsData = []; \r\n\r\n /** @typedef {*} LibIdsType */");

  initDir('./userlibs')
}

initializeApp();