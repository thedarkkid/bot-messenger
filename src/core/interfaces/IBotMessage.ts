import { Context } from "telegraf";

export default interface IBotMessage{
  trigger: string;
  execute: (ctx: Context) => void
}