'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!webshot|^\/webshot/, function(msg) {
  console.log(msg);
  var userId = msg.from.id;
  var url = msg.text.substring(8).trim();
  var image = "https://api.letsvalidate.com/v1/thumbs/?url=" + url + "&width=1280&height=720";
app.bot.sendMessage(msg.chat.id, "[📷](" + image + ") Captura de la web: " + url,{parse_mode : "Markdown"});
});
