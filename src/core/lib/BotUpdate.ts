import { Context } from "telegraf";
import IBotMessage from "../interfaces/IBotMessage";

export default class BotUpdate implements IBotMessage{
  protected updateTypes: string| string[];
  execute: (ctx: Context) => void;

  get trigger(): string| string[]{
    return this.updateTypes;
  }
}