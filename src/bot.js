require("dotenv/config");

const { Telegraf } = require('telegraf');
const { bot } = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {

});

bot.help((ctx) => {

});

bot.on('sticker', (ctx) => {
    ctx.reply('hey there stickerman');
});

bot.hears('hi', (ctx) => {
    ctx.reply('hey there');
});

bot.launch();

exports.defaults.bot = bot;
// Get how to setup bot to use es6
