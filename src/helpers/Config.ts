import Files, { getFileContents, projectBaseDir } from "./Files";

export default class Config{
  private static file = JSON.parse(getFileContents(projectBaseDir("eaxcess.json")));
  static folders:any = Config.file.messengerOptions.messagesFolders;
}