# Telegram Bot Scaffolding
Telegram Bot scaffolding is a template for making the creation of telegram bots easier.
It is written in typescript, bundled with webpack and uses Telegraf as its base framework.

## Getting Started
First use this [Telegram Tutorial](https://core.telegram.org/bots#6-botfather) to create a telegram bot with botfather.

Next clone this repo and in the root directory run:
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
