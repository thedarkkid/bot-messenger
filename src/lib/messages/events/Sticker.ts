import IBotMessage from "../../../core/interfaces/IBotMessage";
import { Context } from "telegraf";

export default class Sticker implements IBotMessage{
  trigger: string = "sticker";
  execute = (ctx: Context) => {
    ctx.reply("hey there sticky");
  }
}