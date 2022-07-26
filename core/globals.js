import { KitsCore } from "./kits/KitsCore.js";
import { KitsFilesHandler } from "./kits/KitsFilesHandler.js";

const kitsCore = new KitsCore();

const kitsFilesHandler = new KitsFilesHandler();
kitsCore.fileHandler = kitsFilesHandler;

export {
  kitsCore,
  kitsFilesHandler,
}
