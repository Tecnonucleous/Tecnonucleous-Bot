'use strict';

const app = require('../../settings/app')

// "Welcome" to new users and "goodbye"

app.bot.on('message', function(msg){
    var chat = {};
    chat.id = msg.chat.id;
    chat.title = msg.chat.title;
    chat.messageId = msg.message_id;

    if (msg.new_chat_members != undefined){

        var newMember = {};
        newMember.id = msg.new_chat_member.id;
        newMember.name = msg.new_chat_member.first_name;
        if (msg.new_chat_member.username !== undefined){
            newMember.alias = msg.new_chat_member.username;
        }

        app.bot.deleteMessage(chat.id, chat.messageId)
        app.bot.sendMessage(chat.id, `${app.i18n.__('Hello ')}${newMember.name}${app.i18n.__(', welcome to the group ')}${chat.title}`)
    }

    else if (msg.left_chat_member != undefined){

        var leftMember = {};
        leftMember.id = msg.left_chat_member.id;
        leftMember.name = msg.left_chat_member.first_name;
        if (msg.left_chat_member.username !== undefined){
            leftMember.alias = msg.left_chat_member.username;
        }

        app.bot.deleteMessage(chat.id, chat.messageId)
        app.bot.sendMessage(chat.id, `${leftMember.name}${app.i18n.__(' left the group')}`)
    }
});
