import { Context } from "telegraf";
import IBotMessage from "../interfaces/IBotMessage";

export default class BotText implements IBotMessage{
  protected triggers: string | Function | RegExp | string[] | RegExp[] ;
  execute: (ctx: Context) => void;
  
  get trigger(): string | Function | RegExp | string[] | RegExp[] {
    return this.triggers;
  }

}