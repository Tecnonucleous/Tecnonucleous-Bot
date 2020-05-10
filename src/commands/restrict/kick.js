'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\/kick|^\!kick/, function(msg){
    if (msg.reply_to_message !== undefined){
        var chat = {};
        chat.id = msg.chat.id;
        var user = {};
        user.id = msg.from.id;
        user.reply = {};
        user.reply.id = msg.reply_to_message.from.id;
        user.reply.name = msg.reply_to_message.from.first_name;

        app.bot.getChatMember(chat.id, user.id).then(function(resolve){
        if ((resolve.status == 'creator') || (resolve.status == 'administrator')){
            app.bot.kickChatMember(chat.id, user.reply.id).then(function(kicked){
                console.log(kicked)
                if (kicked == true){
                    app.bot.sendMessage(chat.id, `${user.reply.name}${app.i18n.__(' has been kicked')}${app.i18n.__('can rejoin the group')}`).then((removeKickedMessage) => {
                        setTimeout(() => {
                            app.bot.deleteMessage(removeKickedMessage.chat.id, removeKickedMessage.message_id)
                        }, 120000);
                    })
                    app.bot.unbanChatMember(chat.id, user.reply.id);
                }
            })
        } else {
            return;
        }
    })
    }

    
})