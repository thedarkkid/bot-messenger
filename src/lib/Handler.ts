require("dotenv/config");
import { Telegraf } from "telegraf";
import {Spinner} from 'clui';
import Messenger from "./messages/Messenger";
import IBotMessage from "../core/interfaces/IBotMessage";

export default class Handler{

  static botBrain = new Telegraf(process.env.BOT_TOKEN);
  static spinner:Spinner = new Spinner("Loading messages...");

  protected static _run = async () => {
    await Messenger.loadMessages();
    const commands: Map<string, IBotMessage> = Messenger.commands;
    const events: Map<any, IBotMessage> = Messenger.events;
    const replies: Map<string, IBotMessage> = Messenger.replies;

    commands.forEach((value, key) => {
      botBrain.command(key, (ctx) => { value.execute(ctx); });
    });

    events.forEach((value, key) => {
      botBrain.on(key, (ctx) => { value.execute(ctx); });
    });

    replies.forEach((value, key) => {
      botBrain.hears(key, (ctx) => { value.execute(ctx); });
    });
  }

  static run = async () => {
    dash.start();
    await Handler._run();
    dash.stop();
  }
  
}

export const botBrain = Handler.botBrain;
export const dash = Handler.spinner;