import { Context } from "telegraf";
import BotText from "../../core/lib/BotText";

export default class Hi extends BotText{
  protected triggers: string = "hi";

  execute = (ctx: Context) => {
    ctx.reply("Oh hey there!");
  }
}