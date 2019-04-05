'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!mod|^\/mod/, function(msg) {

    if (msg.reply_to_message == undefined){
        return;
    };

    const opts = {
        'chat_id': msg.chat.id,
        'userReplyName': msg.reply_to_message.from.first_name,
        'fromId': msg.from.id,
        'messageId': msg.message_id,
        'userReplyId': msg.reply_to_message.from.id,
        'chatType': msg.chat.type
    };

    const permisos = {};

    permisos.can_change_info = false;
    permisos.can_delete_messages = true;
    permisos.can_invite_users = true;
    permisos.can_restrict_members = true;
    permisos.can_pin_messages = true;
    permisos.can_promote_members = false;


    app.bot.getChatMember(opts.chat_id, opts.fromId).then(function(data){
        if ((data.status == 'creator')){
          if (opts.chatType == 'supergroup'){
            app.bot.promoteChatMember(opts.chat_id, opts.userReplyId, permisos).then(function(result){
                app.bot.deleteMessage(opts.chat_id, opts.messageId);
                app.bot.sendMessage(opts.chat_id, "✅ " + opts.userReplyName + app.i18n.__(' , you are now an administrator.'));
            });
          } else{app.bot.sendMessage(opts.chat_id, app.i18n.__('Command only available for supergroups'));}
        }
        else {
            app.bot.sendMessage(opts.chat_id, app.i18n.__('⛔️ Only the creator of the group can use this command'));
        }
    })
});

app.bot.onText(/^\!unmod|^\/unmod/, function(msg) {

    if (msg.reply_to_message == undefined){
        return;
    };

    const opts = {
        'chat_id': msg.chat.id,
        'userReplyName': msg.reply_to_message.from.first_name,
        'fromId': msg.from.id,
        'messageId': msg.message_id,
        'userReplyId': msg.reply_to_message.from.id
    };

    const permisos = {};

    permisos.can_change_info = false;
    permisos.can_delete_messages = false;
    permisos.can_invite_users = false;
    permisos.can_restrict_members = false;
    permisos.can_pin_messages = false;
    permisos.can_promote_members = false;


    app.bot.getChatMember(opts.chat_id, opts.fromId).then(function(data){
        if ((data.status == 'creator')){

          if (opts.chatType == 'supergroup'){
            app.bot.promoteChatMember(opts.chat_id, opts.userReplyId, permisos).then(function(result){
                app.bot.deleteMessage(opts.chat_id, opts.messageId);
                app.bot.sendMessage(opts.chat_id, "❌ " + opts.userReplyName + app.i18n.__(' , you are not an administrator'));
            });
          } else{app.bot.sendMessage(opts.chat_id, app.i18n.__('Command only available for supergroups'));}  
        }
        else {
            app.bot.sendMessage(opts.chat_id, app.i18n.__('⛔️ Only the creator of the group can use this command'));
        }
    })
});
