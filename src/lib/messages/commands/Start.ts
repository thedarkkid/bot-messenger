import IBotMessage from "../../../core/interfaces/IBotMessage";
import { Context } from "telegraf";

export default class Start implements IBotMessage{
  trigger: string = "start";
  execute = (ctx: Context) => {
    ctx.reply("send in your name and email");
  }
}