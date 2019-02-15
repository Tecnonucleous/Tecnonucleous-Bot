'use strict';

const app = require('../../settings/app');

// Como esta creado este comando solo funciona si el usuario que manda el mensaje
// No es ni creador ni administrador del grupo
// Debido a la siguiente condición  "if (infouser.status == 'member')"

app.bot.onText(/^\@admin|^\@admins/, function(msg){

    if (msg.reply_to_message == undefined){
        return;
    }

    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'type_chat': msg.chat.type,
        'fromName': msg.from.first_name,
        'messageId': msg.message_id,
        'replyId_messageId': msg.reply_to_message.message_id,
        'username_chat': msg.chat.username,
        'replyId': msg.reply_to_message.from.id,
        'replyName': msg.reply_to_message.from.first_name,
        'replyText': msg.reply_to_message.text,
        'title': msg.chat.title
    }

    if (prop.type_chat == 'supergroup' && prop.username_chat != null) {
     var deep_link = "https://t.me/" + prop.username_chat + "/" + prop.replyId_messageId;
    }
    else {
      if (prop.type_chat == 'supergroup' && prop.username_chat == undefined) {
        var info_chat_id = String(prop.chat_id); // Realizamos la conversion a String
        var mod_chat_id = info_chat_id.substring(4).trim(); // Eliminamos -100 del chat_id para que funcione el Deep Link
        var deep_link = String("tg://openmessage?chat_id=" + mod_chat_id + "&message_id=" + prop.replyId_messageId);
      }
      }

        app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(infouser){
            if (infouser.status == 'member'){
                app.bot.deleteMessage(prop.chat_id, prop.messageId);
                app.bot.sendMessage(prop.chat_id, "Avisando a los admins").then(function(deletemessage){
                    setTimeout(function(){
                        app.bot.deleteMessage(prop.chat_id, deletemessage.message_id);
                    },10000)
                });

                app.bot.getChatAdministrators(prop.chat_id).then(function(adminsgroup){

                    const properties = {
                        'id': "",
                        'bot': "",
                        'name': "",
                        'alias': "",
                        'adminsinfo': "",
                        'opts': {parse_mode: 'Markdown'}
                    }

                    for (var i = 0; i < adminsgroup.length; i++){
                        properties.adminsinfo = adminsgroup[i].user
                        properties.id = adminsgroup[i].user.id
                        properties.bot = adminsgroup[i].user.is_bot
                        properties.name = adminsgroup[i].user.first_name
                        properties.alias = adminsgroup[i].user.username

                        if (properties.bot == false){
                          app.bot.sendMessage(properties.adminsinfo.id, "🛎 Te avisa: \n👨🏻‍💼 <b>Nombre:</b> " + prop.fromName + "\n🆔 <b>Id:</b> <code>" + prop.from_id + "</code>\n\n❌ <b>Infractor:</b>\n🙅🏻‍♂️ <b>Nombre:</b> " + prop.replyName + "\n🆔 <b>Id:</b> <code>" + prop.replyId + "</code>\n📃 <b>Texto con spam:</b> \n" + prop.replyText + "\n\n🏛 <b>En el grupo:</b> " + prop.title + "\n", {parse_mode: 'HTML', reply_markup:{ inline_keyboard: [[{text: "Ir al mensaje", url: deep_link}]]}});
                        }
                    }
                })
            }else{
              app.bot.sendMessage(prop.chat_id, "Este comando es de uso exclusivo para los usuarios. Su función es enviar alertas a los administradores del grupo.");
            }
        })

});
