'use strict';

const app = require('../../settings/app')

// Bienvenida a nuevos usuarios y despedida de los mismos

app.bot.on('message', function(msg){

    const prop = {
        'chat_id': msg.chat.id,
        'chatTitle': msg.chat.title,
        'messageId': msg.message_id
    }

    if (msg.new_chat_members != undefined){
        
        const newMember = {
            'userId': msg.new_chat_member.id,
            'username': msg.new_chat_member.first_name,
            'userAlias': msg.new_chat_member.username
        }
        
        app.bot.deleteMessage(prop.chat_id, prop.messageId)
        app.bot.sendMessage(prop.chat_id, "Hola " + newMember.username + ", bienvenido al grupo " + prop.chatTitle)
    }

    else if (msg.left_chat_members != undefined){

        const leftMember = {
            'leftUserId': msg.left_chat_member.id,
            'leftUsername': msg.left_chat_member.first_name,
            'leftuserAlias': msg.left_chat_member.username
        }

        app.bot.deleteMessage(prop.chat_id, prop.messageId)
        app.bot.sendMessage(prop.chat_id, leftMember.leftUsername + " abandonó el grupo")
    }
    
});