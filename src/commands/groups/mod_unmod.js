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
        'userReplyId': msg.reply_to_message.from.id
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

            app.bot.promoteChatMember(opts.chat_id, opts.userReplyId, permisos).then(function(result){
                app.bot.deleteMessage(opts.chat_id, opts.messageId);
                app.bot.sendMessage(opts.chat_id, "✅ " + opts.userReplyName + " ahora es administrador.")
            });
        }
        else {
            app.bot.sendMessage(opts.chat_id, "Solo el creador del grupo puede utilizar este comando.");
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

            app.bot.promoteChatMember(opts.chat_id, opts.userReplyId, permisos).then(function(result){
                app.bot.deleteMessage(opts.chat_id, opts.messageId);
                app.bot.sendMessage(opts.chat_id, "❌ " + opts.userReplyName + " ya no es administrador")
            });
        }
        else {
            app.bot.sendMessage(opts.chat_id, "Solo el creador del grupo puede utilizar este comando.");
        }
    })
});