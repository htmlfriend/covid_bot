require('dotenv').config();
const Telegraf = require('telegraf');
const covidService = require('./services/covid');
const messageResponce = require('./messages/message');
const { BOT_TOKEN, URL } = process.env;
const PORT = process.env.PORT || 5000;
const bot = new Telegraf(BOT_TOKEN);
console.log('process', process.env.NODE_ENV);

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

bot.command('env', (ctx) => {
  ctx.reply(`ENV is ${process.env.NODE_ENV}`);
});
// launch
// need webhook

if (process.env.NODE_ENV === 'production') {
  bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
  bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
  console.log('start a bot');
} else {
  bot
    .launch()
    .then((res) => {
      const date = new Date();
      console.log(` Bot launched at ${date}`);
    })
    .catch((err) => console.log(err));
}
