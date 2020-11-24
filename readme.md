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

The preconfigured dev script uses `concurrently` which has to be installed globally on your package manager.
```bash
npm install -g concurrently
```
then you can start development server using the preconfigured dev script, run:
```bash
npm run dev
```
This should start the development server.

Bot messenger uses [Telegraf](telegraf.js.org) to interact with the telegram bot so it uses the telegraf's [middleware](https://telegraf.js.org/#/?id=middleware) and [context](https://telegraf.js.org/#/?id=context). 

### Adding Commands Listeners
To create a command Listener, you have to create a `BotCommand` class in one of the projects commands directories. The default command directory is the `src/messages/commands` directory. The scaffolding config can be found in the `messenger.json`, here you can modify the commands directories, add more command directories e.t.c..

#### Example
Lets try to add a command `/new` to the telegram bot, which replies the user with "send in your name and email for reigstration". First we'd create a `BotCommand` class in the commands directory named `New.ts` and it would look like so:

```Typescript
import BotCommand from "../../core/lib/BotCommand";
import { Context } from "telegraf";

export default class New implements BotCommand{
  protected commands: string = "new";
  execute = (ctx: Context) => {
    ctx.reply("send in your name and email for registration");
  }
}
```
That is all!
The `commands` property can be a type `string` for a single command or type `string[]` for a list of commands to which the `execute` method runs. The value of the commands property is `"new"` since we want the command phrase to be `/new`. The execute method is the method called on the `/new` command. It uses the `ctx` property which is a telegraf `Context`, more info on telegraf contexts can be found [here](https://telegraf.js.org/#/?id=context). Once a `BotCommand` class is in a commands directory the scaffolding automatically loads it as a command.
After adding this class to the scaffolding in a commands directory, you can test it out by sending `/new` as a message to your telegram bot.

### Adding Update Listeners
Update listeners enables your bot to listen to specific update types in telegram, an update listener can be created by creating a `BotUpdate` class in an updates directory. The default updates directory is the "src/messages/updates" directory. The scaffolding config can be found in the `messenger.json`, here you can modify the updates directories, add more directories, e.t.c..

#### Example
Lets try to add an update listener that listens till the bot recieves a message containing a sticker and then replies the user with "you do like your stickers don't you?". First we'd create a `BotUpdate` class in an updates directory named `Sticker.ts` and it would look like so:
```Typescript
import { Context } from "telegraf";
import BotUpdate from "../../core/lib/BotUpdate";

export default class Sticker extends BotUpdate{
  protected updateTypes: string = 'sticker';

  execute = (ctx: Context) => {
    ctx.reply("you do like your stickers don't you?");
  };
} 
```
The `updateTypes` property can be of type `string` or `string[]` similar to the commands property. I can take either a single update type or an array of update types.

#### Update Types
These are the different update types that are there, they are: `'callback_query','channel_post', 'chosen_inline_result', 'edited_channel_post', 'edited_message', 'inline_query', 'shipping_query', 'pre_checkout_query', 'message', 'poll', 'poll_answer'`. A message sub type can also be added to an Update listener as an `UpdateTypes` value. The different message sub types available for use are: `'voice', 'video_note', 'video', 'animation', 'venue', 'text', 'supergroup_chat_created', 'successful_payment', 'sticker', 'pinned_message', 'photo', 'new_chat_title', 'new_chat_photo', 'new_chat_members', 'migrate_to_chat_id', 'migrate_from_chat_id', 'location', 'left_chat_member', 'invoice', 'group_chat_created', 'game', 'dice', 'document', 'delete_chat_photo', 'contact', 'channel_chat_created', 'audio', 'connected_website', 'passport_data', 'poll', 'forward_date'`. Bot the update types and message sub types are self explanatory and only these specific types strings are valid values for the `updateTypes` property.

### Adding Text Listeners
A text listener listens to sepcific text and runs the `execute` method once that text is sent to the bot. A text listener can be created by creating a `BotText` class in a texts directory. The default texts directory is the "src/messages/texts" directory. The scaffolding config can be found in the `messenger.json`, here you can modify the texts directories, add more directories, e.t.c..

#### Example
Lets try to add an text listener that listens till the bot recieves a message containing the words "hi" and "hey there" and then replies the user with "Hi, I'm bot messenger, you?". First we'd create a `BotText` class in a texts directory named `Hi.ts` and it would look like so:
```Typescript
import { Context } from "telegraf";
import BotText from "../../core/lib/BotText";

export default class Hi extends BotText{
  protected triggers: string[] = ["hi", "hey there"];

  execute = (ctx: Context) => {
    ctx.reply(Hi, I'm bot messenger, you?");
  }
}
```
Once this class is in a text directory the scaffolding automatically loads it and utilises it accordingly. The `triggers` property could be of either type `string`, `Function`, `string[]`, `RegExp` or `RegExp[]` so it could be used accordingly.

Since the scaffolding relies heavily on Telegraf `Context`s, you can check out telegraf offical docs [here](https://telegraf.js.org/#/?id=context). 
