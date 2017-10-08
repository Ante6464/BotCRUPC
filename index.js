var Telebot = require('telebot');
var fs = require('fs');
var path = require('path');

var lang = require('./lang/lang-default'); // Change this to change the language
var dict = lang.vortaro();


const bot = new Telebot("457148721:AAH59U4s3FEVqiE_V43koSUSG0QEVZVp_HI");

bot.on('/start', (ctx) => {
  fs.writeFileSync("stateCRUPC", "closed");
  fs.writeFileSync("counterHoli", "0");
  ctx.reply.text("Holi crupcero!");
});
bot.on('/isopen', (ctx) => {
  var file = fs.readFileSync("stateCRUPC", 'utf-8');
  var isopen = (file == "open") ? true : false;
  if (isopen) bot.sendSticker(ctx.chat.id, 'CAADBAADRgADZhkVBXvnbcBrbN7EAg');
  else bot.sendSticker(ctx.chat.id, 'CAADBAADSAADZhkVBR-6hyRG6fjYAg');
});
bot.on('/countholis', (ctx) => {
  var file = fs.readFileSync("counterHoli", 'utf-8');
  ctx.reply.text(file + dict['1']);
});
bot.on('/eurobeat', (ctx) => {
  ctx.reply.text('https://www.youtube.com/watch?v=7u3jv7zC4kU&list=PLGdEbnOoiEOOaFFYKh3A66wOUlrHUwzTs');
});

bot.on(/hi/, (ctx) => holis(ctx));
bot.on(/Hi/, (ctx) => holis(ctx));
bot.on('sticker', (ctx) => {

  if (ctx.chat.id < 0 || (ctx.chat.id > 0 && ctx.from.username == 'XvaiKawaii')) {
    var file = fs.readFileSync("stateCRUPC", 'utf-8');
    if (ctx.sticker.emoji == '🚪' && ctx.sticker.set_name == "CRUPC") {
      console.log("file:" + file);
      if (file == "closed") {
        fs.writeFileSync("stateCRUPC", "open");
        console.log("write");
      }
      console.log("open");
      ctx.reply.text(dict['6']);
    }
    else if (ctx.sticker.emoji == '😒' && ctx.sticker.set_name == "CRUPC") {
      console.log("file:" + file);
      if (file == "open") {
        fs.writeFileSync("stateCRUPC", "closed");
        console.log("write");
      }
      console.log("closed");
      ctx.reply.text(dict['7']);
    }
  } 
  else {
  ctx.reply.text(dict['5']);
  }
});
bot.start();

function holis(ctx) {
  var file = fs.readFileSync("counterHoli", 'utf-8');
  file++;
  fs.writeFileSync("counterHoli", file);
  ctx.reply.text(dict['4'])
}