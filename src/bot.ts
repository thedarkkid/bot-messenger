require("dotenv/config");
import { Telegraf } from "telegraf";

export const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command('oldschool', (ctx) => ctx.reply('Hello'))

bot.start((ctx) => ctx.reply('Welcome'));

bot.help((ctx) => {

});

bot.on('sticker', (ctx) => {
    ctx.reply('hey there stickerman');
});

bot.hears('hi', (ctx) => {
    ctx.reply('hey there');
});

bot.launch();
