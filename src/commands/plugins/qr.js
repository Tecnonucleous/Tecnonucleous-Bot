'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!qr|^\/qr/, function(msg) {
  console.log(msg);
  var userId = msg.from.id;
  var data = msg.text.substring(3).trim();
  // Con este if/else controlamos los posibles errores que puede comenter un usuario
  // al introducir la información que se requiere para usar este comando
  if(data != ""){
  var imageqr = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
    if(msg.chat.type == 'private'){
      app.bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")Qr code de: " + data,{parse_mode : "Markdown"});
        }
    else{
      app.bot.deleteMessage(msg.chat.id, msg.message_id);
      app.bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")Qr code de: " + data,{parse_mode : "Markdown"});
        }
  }
  else {
    // En los chats privados (User + Bot) no podemos borrar el mensaje que nos manda el usuario
    // Debido a esto creamos un if haciendo que si el tipo de chat es privado solo mande la respuesta
    if(msg.chat.type == 'private'){
      app.bot.sendMessage(msg.chat.id, "Error, para usar este comando tienes que escribir !qr + Texto o /qr \n\nEjemplo: !qr google.es",{parse_mode : "Markdown"});
    }
    else{
      app.bot.deleteMessage(msg.chat.id, msg.message_id);
    app.bot.sendMessage(msg.chat.id, "Error, para usar este comando tienes que escribir !qr + Texto o /qr \n\nEjemplo: !qr google.es",{parse_mode : "Markdown"});
   }
  }
});
