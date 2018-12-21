'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\/kick/, function(msg){
    if (msg.reply_to_message == undefined){
        return;
    }

    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'replyFromId': msg.reply_to_message.from.id,
        'replyfromName': msg.reply_to_message.from.first_name
    }

    app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(resolve){
        if ((resolve.status == 'creator') || (resolve.status == 'administrator')){
            app.bot.kickChatMember(prop.chat_id, prop.replyFromId).then(function(kicked){
                app.bot.sendMessage(prop.chat_id, prop.replyfromName + " ha sido kickeado")
                app.bot.unbanChatMember(prop.chat_id, prop.replyFromId).then(function(deskicked){
                })
            })
        } else {
            return;
        }
    })
})