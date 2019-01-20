'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!link|^\/link/, function(msg){

    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'chatType': msg.chat.type
    }

    if (prop.chatType == 'supergroup'){
        app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(infouser){
            if ((infouser.status == 'creator') || (infouser.status == 'administrator')){
                app.bot.exportChatInviteLink(prop.chat_id).then(function(link){
                    var url = link
                    app.bot.sendMessage(prop.chat_id, "Enlace del grupo \n" + url)
                });
            } else {
                app.bot.deleteMessage(prop.chat_id, msg.message_id)
                app.bot.sendMessage(prop.chat_id, "Comando solo para administradores y creador")
            }
        })
    }
})
