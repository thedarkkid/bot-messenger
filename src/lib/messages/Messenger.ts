import Config from "../../helpers/Config";
import path from "path";
import IBotMessage from "../../core/interfaces/IBotMessage";
import { dash } from "../Handler";
import { dirExists, doInDir, getRelativePath } from "../../helpers/Files";
import { projectBaseDir } from "../../helpers/Files";
import Echo from "../../helpers/Echo";

export default class Messenger {
  static commands: Map<string, IBotMessage> = new Map<string, IBotMessage>();
  static events: Map<string, IBotMessage> = new Map<string, IBotMessage>();
  static replies: Map<string, IBotMessage> = new Map<string, IBotMessage>();

  public static loadMessages = async (): Promise<void> => {
    const folders = Config.folders;
    await Messenger.loadCommands(folders.commands);
    await Messenger.loadEvents(folders.on);
    await Messenger.loadReplies(folders.hears);
    Echo.success("Messages loaded.")
  }

  private static getFileRelativePathToMessenger(absFilePath: string) {
    const messsengerPath = Config.messengerFilePath;
    const split = messsengerPath.split("/");
    const fileName = split[split.length - 1];

    const pathToRoot = path.relative(messsengerPath, fileName);
    const fromRoot = absFilePath.replace(projectBaseDir(""), "");
    let relPath = path.relative(projectBaseDir(messsengerPath), absFilePath);
    return (relPath.replace("..\\", ".\\")).replace(/\\/g, "/");
    
  }
  private static loadEvents = async (eventFolders: Array<Object>) => {
     // in on
     dash.message("Loading events...");
     eventFolders.forEach( (onObj:any) => {
       doInDir(projectBaseDir(onObj.folder), (absFilePath: string, relFilePath: string) => {
         let importPath = Messenger.getFileRelativePathToMessenger(absFilePath);;
         import(`${importPath}`).then(_import => {
           const MessageObj = _import.default;
           const messageObj = new MessageObj();
           Messenger.events.set(messageObj.trigger, messageObj);
         });
       }, onObj.deep);
     });
     dash.message("Events Loaded...");

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

  private static loadReplies = async (replyFolders: Array<Object>) => {
    // in hears
    dash.message("Loading replies...");
    replyFolders.forEach( (onObj:any) => {
      doInDir(projectBaseDir(onObj.folder), (absFilePath: string, relFilePath: string) => {
        let importPath = Messenger.getFileRelativePathToMessenger(absFilePath);;
        import(`${importPath}`).then(_import => {
          const MessageObj = _import.default;
          const messageObj = new MessageObj();
          Messenger.replies.set(messageObj.trigger, messageObj);
        });
      }, onObj.deep);
    });
    dash.message("Replies Loaded");
  }

}