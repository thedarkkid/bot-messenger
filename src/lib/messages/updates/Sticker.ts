import { Context } from "telegraf";
import BotUpdate from "../../../core/lib/BotUpdate";

export default class Sticker extends BotUpdate{
  protected updateTypes: string = 'sticker';

  execute = (ctx: Context) => {
    ctx.reply("you do like your stickers don't you?");
  };
}