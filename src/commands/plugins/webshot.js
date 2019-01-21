'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!webshot|^\/webshot/, function(msg) {
  console.log(msg);
  var userId = msg.from.id;
  var url = msg.text.substring(8).trim();
  var image = "https://api.letsvalidate.com/v1/thumbs/?url=" + url + "&width=1280&height=720";
    if(url != ""){
      if(msg.chat.type == 'private'){
      app.bot.sendMessage(msg.chat.id, "[📷](" + image + ") Captura de la web: " + url,{parse_mode : "Markdown"});
      }
      else{
      app.bot.deleteMessage(msg.chat.id, msg.message_id);
      app.bot.sendMessage(msg.chat.id, "[📷](" + image + ") Captura de la web: " + url,{parse_mode : "Markdown"});
      }
  }
else{
  if(msg.chat.type == 'private'){
  app.bot.sendMessage(msg.chat.id, "⛔️ Error, para poder usar el comando !webshot tienes que escribir !webshot + url \n\nEjemplo: !webshot google.es",{parse_mode : "Markdown"});
  }
  else{
    app.bot.sendMessage(msg.chat.id, "⛔️ Error, para poder usar el comando !webshot tienes que escribir !webshot + url \n\nEjemplo: !webshot google.es",{parse_mode : "Markdown"});
    app.bot.deleteMessage(msg.chat.id, msg.message_id);
  }
  }
});
