'use strict';
const app = require('../../settings/app')

app.bot.onText(/^\!pin|^\/pin/, (msg) => {
    if (msg.reply_to_message !== undefined){
        var chat = {};
        chat.id = msg.chat.id;
        chat.type = msg.chat.type;
        chat.messageId = msg.message_id;
        chat.reply = {};
        chat.reply.messageId = msg.reply_to_message.message_id;

        var user = {};
        user.id = msg.from.id;

        var options = {};
        options.disable_notification = false;

        app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
            if ((infoUser.status == 'creator') || (infoUser.status == 'administrator')){
                if ((chat.type == 'supergroup') || (chat.type == 'group')){
                    app.bot.pinChatMessage(chat.id, chat.reply.messageId, options);
                    app.bot.deleteMessage(chat.id, chat.messageId)
                } else if (chat.type == 'private'){
                    app.bot.sendMessage(chat.id, `${app.i18n.__('Command only available for supergroups')}`)
                }
            } else {
                app.bot.sendMessage(chat.id, `${app.i18n.__('Command only available for admins and creator')}`)
            }
        })
    }
})

app.bot.onText(/^\!unpin|^\/unpin/, (msg) => {
    var chat = {};
    var user = {};

    chat.id = msg.chat.id;
    chat.messageId = msg.message_id;
    chat.type = msg.chat.type;
    user.id = msg.from.id;

    app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
        if ((infoUser.status == 'creator') || (infoUser.status == 'administrator')){
            if ((chat.type == 'supergroup') || (chat.type == 'group')){
                app.bot.unpinChatMessage(chat.id);
                app.bot.deleteMessage(chat.id, chat.messageId);
            } else {
                app.bot.sendMessage(chat.id, `${app.i18n.__('Command only available for supergroups')}`)
            }
        } else {
            app.bot.sendMessage(chat.id, `${app.i18n.__('Sorry, you are not an admin')}`)
        }
    })
})
