import { commitLibsData, convertLibsScriptToData } from './core/userlibsHelper/commitLibs.js';

function loadLibs() {
  convertLibsScriptToData('./userlibs/').then(res => {
    commitLibsData(res);
  })
}

loadLibs();