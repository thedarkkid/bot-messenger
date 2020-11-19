import Config from "../../helpers/Config";
import path from "path";
import IBotMessage from "../../core/interfaces/IBotMessage";
import { dash } from "../Handler";
import { doInDir } from "../../helpers/Files";
import { projectBaseDir } from "../../helpers/Files";
import Echo from "../../helpers/Echo";

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
     // in on
     dash.message("Loading updates...");
     eventFolders.forEach( (onObj:any) => {
       doInDir(projectBaseDir(onObj.folder), (absFilePath: string, relFilePath: string) => {
         let importPath = Messenger.getFileRelativePathToMessenger(absFilePath);;
         import(`${importPath}`).then(_import => {
           const MessageObj = _import.default;
           const messageObj = new MessageObj();
           Messenger.updates.set(messageObj.trigger, messageObj);
         });
       }, onObj.deep);
     });
     dash.message("Updates Loaded...");
  }
  
  private static loadCommands = async (commandFolders: Array<Object>) => {
    // in commands
    dash.message("Loading commands...");
    commandFolders.forEach((onObj: any) => {
      doInDir(projectBaseDir(onObj.folder), (absFilePath: string, relFilePath: string) => {
        let importPath = Messenger.getFileRelativePathToMessenger(absFilePath);;
        import(`${importPath}`).then(_import => {
          const MessageObj = _import.default;
          const messageObj = new MessageObj();
          Messenger.commands.set(messageObj.trigger, messageObj);
        });
      }, onObj.deep);
    });
    dash.message("Commands Loaded");
  }

  private static loadTexts = async (replyFolders: Array<Object>) => {
    dash.message("Loading texts...");
    replyFolders.forEach( (onObj:any) => {
      doInDir(projectBaseDir(onObj.folder), (absFilePath: string, relFilePath: string) => {
        let importPath = Messenger.getFileRelativePathToMessenger(absFilePath);;
        import(`${importPath}`).then(_import => {
          const MessageObj = _import.default;
          const messageObj = new MessageObj();
          Messenger.texts.set(messageObj.trigger, messageObj);
        });
      }, onObj.deep);
    });
    dash.message("Texts Loaded");
  }

}