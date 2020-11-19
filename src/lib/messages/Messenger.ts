import Config from "../../core/helpers/Config";
import path from "path";
import IBotMessage from "../../core/interfaces/IBotMessage";
import { dash } from "../Handler";
import { doInDir } from "../../core/helpers/Files";
import { projectBaseDir } from "../../core/helpers/Files";
import Echo from "../../core/helpers/Echo";

export default class Messenger {
  static commands: Map<string, IBotMessage> = new Map<string, IBotMessage>();
  static updates: Map<string, IBotMessage> = new Map<string, IBotMessage>();
  static texts: Map<string, IBotMessage> = new Map<string, IBotMessage>();

  public static loadMessages = async (): Promise<void> => {
    const folders = Config.folders;
    await Messenger.loadTexts(folders.texts);
    await Messenger.loadCommands(folders.commands);
    await Messenger.loadUpdates(folders.updates);
    Echo.success("Messages loaded.")
  }

  private static getFileRelativePathToMessenger(absFilePath: string) {
    const messsengerPath = Config.messengerFilePath;
    let relPath = path.relative(projectBaseDir(messsengerPath), absFilePath);
    return (relPath.replace("..\\", ".\\")).replace(/\\/g, "/");
  }

  private static loadUpdates = async (eventFolders: Array<Object>) => {
    dash.message("Loading updates...");
    await eventFolders.forEach(async (onObj: any) => {
      await doInDir(projectBaseDir(onObj.folder), async (absFilePath: string, relFilePath: string) => {
        let importPath = Messenger.getFileRelativePathToMessenger(absFilePath);;
        const _import = await import(`${importPath}`);
        const messageObj = new (_import.default)();
        Messenger.updates.set(messageObj.trigger, messageObj);
      }, onObj.deep);
     });
    dash.message("Updates Loaded...");
  }
  
  private static loadCommands = async (commandFolders: Array<Object>) => {
    dash.message("Loading commands...");
    await commandFolders.forEach(async (onObj: any) => {
      await doInDir(projectBaseDir(onObj.folder), async (absFilePath: string, relFilePath: string) => {
        let importPath = Messenger.getFileRelativePathToMessenger(absFilePath);;
        const _import = await import(`${importPath}`);
        const messageObj = new(_import.default)();
        Messenger.commands.set(messageObj.trigger, messageObj);
      }, onObj.deep);
    });
    dash.message("Commands Loaded");
  }

  private static loadTexts = async (replyFolders: Array<Object>) => {
    dash.message("Loading texts...");
    await replyFolders.forEach( async (onObj:any) => {
      await doInDir(projectBaseDir(onObj.folder), async (absFilePath: string, relFilePath: string) => {
        let importPath = Messenger.getFileRelativePathToMessenger(absFilePath);;
        const _import = await import(`${importPath}`);
        const messageObj = new(_import.default)();
        Messenger.texts.set(messageObj.trigger, messageObj);
      }, onObj.deep);
    });
    dash.message("Texts Loaded");
  }

}