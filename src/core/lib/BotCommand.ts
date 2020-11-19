import { Context } from "telegraf";
import IBotMessage from "../interfaces/IBotMessage";

export default class BotCommand implements IBotMessage{
  protected commands: string[] | string; 
  execute: (ctx: Context) => void;

  get trigger(): string| string[] {
    return this.commands;
  }
}