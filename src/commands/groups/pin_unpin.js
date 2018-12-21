'use strict';

const app = require('../../settings/app')

app.bot.onText(/^\!pin|^\/pin/, function(msg){
    if (msg.reply_to_message == undefined){
        return;
    };

    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'messageId': msg.message_id,
        'chatType': msg.chat.type,
        'replyMsg': msg.reply_to_message.message_id
    };
    const opts = {};
    opts.disable_notification = false;

    app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(data){
        if ((data.status == 'creator')|| (data.status == 'administrator')){
            if (prop.chatType == 'supergroup'){
                app.bot.pinChatMessage(prop.chat_id, prop.replyMsg, opts);
                app.bot.deleteMessage(prop.chat_id, prop.messageId)
            } else if (prop.chatType == 'private'){
                app.bot.sendMessage(prop.chat_id, "Comando solo disponible en supergrupos")
            } else if (prop.chatType == 'group'){
                app.bot.sendMessage(prop.chat_id, "Comando solo disponible en supergrupos")
            }
        } else {
            app.bot.sendMessage(prop.chat_id, "Comando solo para administradores y creador")
        }
    })
});

app.bot.onText(/^\!unpin|^\/unpin/, function(msg){

    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'messageId': msg.message_id
    }

    app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(data){
        if ((data.status == 'creator') || (data.status == 'administator')){
            app.bot.deleteMessage(prop.chat_id, prop.messageId);
            app.bot.unpinChatMessage(prop.chat_id)
        } else {
            bot.sendMessage(prop.chat_id, "Lo siento, no eres administrador")
        }
    })
});