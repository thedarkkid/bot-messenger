import Config from "../../helpers/Config";
import IBotMessage from "../../core/interfaces/IBotMessage";
import { dash } from "../Handler";
import { doInDir } from "../../helpers/Files";
import { projectBaseDir } from "../../helpers/Files";

export default class Messenger {
  static commands: Map<string, IBotMessage> = new Map<string, IBotMessage>();
  static events: Map<string, IBotMessage> = new Map<string, IBotMessage>();
  static replies: Map<string, IBotMessage> = new Map<string, IBotMessage>();

  public static loadMessages = async (): Promise<void> => {
    const folders = Config.folders;
    await Messenger.loadCommands(folders.commands);
    await Messenger.loadEvents(folders.on);
    await Messenger.loadReplies(folders.hears);
  }

  private static loadEvents = async (eventFolders: Array<Object>) => {
     // in on
     dash.message("Loading events...");
     eventFolders.forEach( (onObj:any) => {
       doInDir(projectBaseDir(onObj.folder), (filePath: string) => {
         import(`${filePath}`).then(_import => {
           const MessageObj = _import.default;
           const messageObj = new MessageObj();
           Messenger.events.set(messageObj.trigger, messageObj);
         });
       }, onObj.deep);
     });
 
  }
  
  private static loadCommands = async (commandFolders: Array<Object>) => {
    // in commands
    dash.message("Loading commands...");
    commandFolders.forEach( (onObj:any) => {
      doInDir(projectBaseDir(onObj.folder), (filePath: string) => {
        import(`${filePath}`).then(_import => {
          const MessageObj = _import.default;
          const messageObj = new MessageObj();
          Messenger.commands.set(messageObj.trigger, messageObj);
        });
      }, onObj.deep);
    });
  }

  private static loadReplies = async (replyFolders: Array<Object>) => {
    // in hears
    dash.message("Loading replies...");
    replyFolders.forEach( (onObj:any) => {
      doInDir(projectBaseDir(onObj.folder), (filePath: string) => {
        import(`${filePath}`).then(_import => {
          const MessageObj = _import.default;
          const messageObj = new MessageObj();
          Messenger.replies.set(messageObj.trigger, messageObj);
        });
      }, onObj.deep);
    });
  }

}