import BotCommand from "../../../core/lib/BotCommand";
import { Context } from "telegraf";

export default class New extends BotCommand{
  protected commands: string = "new";

  execute = (ctx: Context) => {
    ctx.reply("Hi, I see you're new here")
  }
}