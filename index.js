require('dotenv').config();
const Telegraf = require('telegraf');
const covidService = require('./services/covid');
const messageResponce = require('./messages/message');
const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Telegraf(BOT_TOKEN);

// start, help
bot.start((ctx) =>
  ctx.reply(
    `Welcome to covid Bot. You need to send a name of country where you want to get covid data in your country.
		If don't know how to work press ---->  /help`
  )
);

bot.help((ctx) => {
  ctx.reply(`Exapmle:
	Ukraine,
	Russia,
	China`);
});
// handlers

bot.hears(/.*/, async (ctx) => {
  const { data } = await covidService.getByCountry(ctx.message.text);
  if (data && data.results === 0) {
    return ctx.reply('Country not found. Try another');
  }
  //  else {
  //   console.log(data);
  return ctx.replyWithMarkdown(messageResponce(data.response[0]));
  // }
  // console.log(data.response[0]);
  // return ctx.reply(`You said ${ctx.message.text}`);
});
// launch
bot
  .launch()
  .then((res) => {
    const date = new Date();
    console.log(` Bot launched at ${date}`);
  })
  .catch((err) => console.log(err));
