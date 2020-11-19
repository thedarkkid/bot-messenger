import { Context } from "telegraf";

export default class IBotMessage{
  execute: (ctx: Context) => void
  get trigger(): string| string[]| RegExp| RegExp[]| Function {
    throw new Error("IBotMessage not implemented");
  }
}