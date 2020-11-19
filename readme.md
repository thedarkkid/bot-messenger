# Bot Messenger
Bot Messenger is a template for making the creation of telegram bots easier. It is written in [Typscript](https://www.typescriptlang.org/), bundled with [Webpack](webpack.js.org) and uses [Telegraf](telegraf.js.org) as it's base framework.

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

The preconfigured watch script uses `concurrently` which has to be installed globally on your package manager.
```bash
npm install -g concurrently
```
then you can start development server using the preconfigured watch script, run:
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
  trigger: string = "trigger_text";
  execute = (ctx: Context) => {
    ctx.reply("bot message replies");
  }
}
```
The `trigger` property is the text that is used to trigger the `execute` method. It could be a `word`, `command` or `event name`.

### Adding Commands
Bot messenger uses [Telegraf](telegraf.js.org) to interact with the telegram bot so it uses the telegraf's [middleware](https://telegraf.js.org/#/?id=middleware) and [context](https://telegraf.js.org/#/?id=context). To create a command, you have to create a `BotMessage` class in the projects command directory. The default command directory is the `src/lib/messages/commands` directory. The scaffolding config can be found in the `messenger.json`, here you can modify the command directory, add more command directories and many more.

#### Example
Lets try to add a command `/new` to the telegram bot, which replies the user with "send in your name and email for reigstration". First we'd create a `BotMessage` class in the commands directory named `New.ts` and it would look like so:

```Typescript
import IBotMessage from "../../../core/interfaces/IBotMessage";
import { Context } from "telegraf";

export default class New implements IBotMessage{
  trigger: string = "new";
  execute = (ctx: Context) => {
    ctx.reply("send in your name and email for registration");
  }
}
```
That is all!
The `trigger` property in this case is the command phrase, since we want ours to be `/new`, the trigger property will be `new`. The execute method is the method called on the `/new` command. It uses the `ctx` property which is a telegraf context, more info on telegraf contexts can be found [here](https://telegraf.js.org/#/?id=context). Once a `BotMessage` class is in a commands directory the scaffolding automatically loads it as a command.

### Adding Event Listeners
Event listeners enables your bot to listen to specific `events` in telegram, an event listener can be created by creating a `BotMessage` class in the events directory. The default events directory is the "src/lib/messages/events" directory. The scaffolding config can be found in the `messenger.json`, here you can modify the events directory, add more events directories and many more.

#### Example

#### Event Types
