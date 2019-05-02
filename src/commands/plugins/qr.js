'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!qr|^\/qr/, function(msg) {
  console.log(msg);
  var userId = msg.from.id;
  var data = msg.text.substring(3).trim();
  // Use if/else for control when user only send a command without text
  if(data != ""){
  var imageqr = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
    if(msg.chat.type == 'private'){
      app.bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")" + app.i18n.__('Qr code of: ') + data,{parse_mode : "Markdown"});
        }
    else{
      app.bot.deleteMessage(msg.chat.id, msg.message_id);
      app.bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")" + app.i18n.__('Qr code of: ') + data,{parse_mode : "Markdown"});
        }
  }
  else {
    // Update: Bot API 4.2 in private chat (User + Bot) now we can delete user messenges (Max time 24h)
    if(msg.chat.type == 'private'){
      app.bot.sendMessage(msg.chat.id, app.i18n.__('⛔️ Error, for use this command you have to write !qr + Text or /qr \n\nExample: !qr google.es'),{parse_mode : "Markdown"});
    }
    else{
      app.bot.deleteMessage(msg.chat.id, msg.message_id);
    app.bot.sendMessage(msg.chat.id, app.i18n.__('⛔️ Error, for use this command you have to write !qr + Text or /qr \n\nExample: !qr google.es'),{parse_mode : "Markdown"});
   }
  }
});