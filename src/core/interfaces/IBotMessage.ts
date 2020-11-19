import { Context } from "telegraf";

export type Trigger = string | string[] | RegExp | RegExp[] | Function;
export default class IBotMessage{
  execute: (ctx: Context) => void
  get trigger(): Trigger {
    throw new Error("IBotMessage not implemented");
  }
}