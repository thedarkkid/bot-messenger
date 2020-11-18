# Telegram Bot Scaffolding
Telegram Bot scaffolding is a template for making the creation of telegram bots easier. It is written in [Typscript](https://www.typescriptlang.org/), bundled with [Webpack](webpack.js.org) and uses [Telegraf](telegraf.js.org) as it's base framework.

## Getting Started
First use this [Telegram Tutorial](https://core.telegram.org/bots#6-botfather) to create a telegram bot with botfather. Next clone this repo and in the root directory run:
```bash
npm install
```
After that create a .env file in the root directory of the project and add the following configurations to it.
```env
BOT_TOKEN=<bot-token>
```
where <bot-token> is the token given by botfather.

To start development server using the preconfigured watch script, run:
```bash
npm run watch
```
This should start the development server.

### Creating a BotMessage Class
A bot message class is a class that extends the `IBotMessage` interface located in the `src/core/interfaces/IBotMessage`. A basic `BotMessage` class looks like this:
```Typescript
import IBotMessage from "./core/interfaces/IBotMessage";
import { Context } from "telegraf";

export default class BotMessage implements IBotMessage{
  trigger: string = "start";
  execute = (ctx: Context) => {
    ctx.reply("bot message replies");
  }
}
```
The `trigger` property is the text that is used to trigger the `execute` method. It could be a `word`, `command` or `event name`.

### Adding Commands
The scaffolding uses [Telegraf](telegraf.js.org) to interact with the telegram bot so it uses the telegraf's [middleware](https://telegraf.js.org/#/?id=middleware) and [context](https://telegraf.js.org/#/?id=context). To create a command, you have to create a `BotMessage` class in the projects command directory. The default command directory is the `src/lib/messages/commands` directory. The scaffolding config can be found in the `messenger.json`, here you can modify the command directory add more command directories and many more.
 
