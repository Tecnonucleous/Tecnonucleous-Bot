'use strict';

const app = require('../../settings/app')

app.bot.onText(/^\!chatid|^\/chatid/, function(msg){

  const prop = {
      'chat_id': msg.chat.id,
      'chat_title': msg.chat.title,
      'message_id': msg.message_id,
      };
      // Checking Chat Type -- Comprobación del tipo de Chat
      if (msg.chat.type == 'private') {
        app.bot.sendMessage(prop.chat_id, "👤 Nombre del chat: " + prop.chat_title + "\n└ChatID: <code>" + prop.chat_id + "</code>", {parse_mode: 'HTML'});
      }
      else {
        app.bot.deleteMessage(msg.chat.id, msg.message_id);
        app.bot.sendMessage(prop.chat_id, "👤 Nombre del chat: " + prop.chat_title + "\n└ChatID: <code>" + prop.chat_id + "</code>", {parse_mode: 'HTML'});
           }
    });

app.bot.onText(/^\!getid|^\/getid/, function(msg){
  const prop = {
      'chat_id': msg.chat.id,
      'user_id': msg.from.id,
      'username': msg.from.username,
      'nameFirst': msg.from.first_name,
      'undefinedUsername': ""
      };
    //  Checking Alias -- Comprobación de Alias
    if (prop.username == undefined){
      prop.undefinedUsername += "Alias no establecido"
    }
    else {
      prop.undefinedUsername += "@" + prop.username
    }
    // Checking Chat Type -- Comprobación del tipo de Chat
    if (msg.chat.type == 'private') {
      app.bot.sendMessage(prop.chat_id, "👤 Nombre de usuario: " + prop.nameFirst + "├\nUserID: <code>" + prop.user_id + "</code>\n└" + "Alias de usuario: " + prop.undefinedUsername, {parse_mode: 'HTML'})
    }
    else {
      app.bot.deleteMessage(msg.chat.id, msg.message_id);
      app.bot.sendMessage(prop.chat_id, "👤 Nombre de usuario: " + prop.nameFirst + "\n├UserID: <code>" + prop.user_id + "</code>\n└" + "Alias de usuario: " + prop.undefinedUsername, {parse_mode: 'HTML'})
    }

  });
