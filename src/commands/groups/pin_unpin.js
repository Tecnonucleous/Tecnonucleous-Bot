'use strict';

const app = require('../../settings/app')

app.bot.onText(/^\!pin|^\/pin/, function(msg){
    if (msg.reply_to_message == undefined){
		app.bot.sendMessage(msg.chat.id, app.i18n.__('To use the !pin command you need to reply to the message you want to anchor'));
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
            if ((prop.chatType == 'supergroup')||(prop.chatType == 'group')){
                app.bot.pinChatMessage(prop.chat_id, prop.replyMsg, opts);
                app.bot.deleteMessage(prop.chat_id, prop.messageId);
            } else if (prop.chatType == 'private'){
                app.bot.sendMessage(prop.chat_id, app.i18n.__('Command only available for supergroups'));
            }
        } else {
            app.bot.sendMessage(prop.chat_id, app.i18n.__('Command only available for admins and creator'));
        }
    })
});

app.bot.onText(/^\!unpin|^\/unpin/, function(msg){

    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'messageId': msg.message_id,
		'chatType': msg.chat.type
    }

    app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(data){
        if ((data.status == 'creator') || (data.status == 'administator')){
			if ((prop.chatType == 'supergroup')||(prop.chatType == 'group')){
            app.bot.deleteMessage(prop.chat_id, prop.messageId);
            app.bot.unpinChatMessage(prop.chat_id)
			} else {
				app.bot.sendMessage(prop.chat_id, app.i18n.__('Command only available for supergroups'));
			}
        } else {
            bot.sendMessage(prop.chat_id, app.i18n.__('Sorry, you are not an admin'));
        }
    })
});
