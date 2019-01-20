'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!qr|^\/qr/, function(msg) {
  console.log(msg);
  var userId = msg.from.id;
  var data = msg.text.substring(3).trim();
  var imageqr = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
app.bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")Qr code de: " + data,{parse_mode : "Markdown"});
});
