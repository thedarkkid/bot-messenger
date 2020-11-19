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
    const texts: Map<string, IBotMessage> = Messenger.texts;
    const updates: Map<any, IBotMessage> = Messenger.updates;

    commands.forEach((value, key) => { botBrain.command(key, (ctx) => { value.execute(ctx); }); });
    texts.forEach((value, key) => { botBrain.hears(key, (ctx) => { value.execute(ctx); }); });
    updates.forEach((value, key) => { botBrain.on(key, (ctx) => { value.execute(ctx); }); });
  }

  static run = async () => {
    dash.start();
    await Handler._run();
    dash.stop();
  }
  
}

export const botBrain = Handler.botBrain;
export const dash = Handler.spinner;