'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\/ban (.+)/, function(msg, match){
    
    if (msg.reply_to_message == undefined){
        return;
    }

    const ms = require('ms')
    const prop = {
        'chat_id': msg.chat.id,
        'messageId': msg.message_id,
        'timeban': match[1],
        'fromId': msg.from.id,
        'replyUserId': msg.reply_to_message.from.id,
        'replyUserName': msg.reply_to_message.from.first_name,
    };
    const desban = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Desbanear", callback_data: 'desban:' + prop.replyUserId + ":" + prop.fromId + ":" + prop.chat_id + ":" + prop.replyUserName}
                ]
            ]
        }
    };

    app.bot.getChatMember(prop.chat_id, prop.fromId).then(function(info){
        if ((info.status == 'creator')|| (info.status == 'administrator')){
            app.bot.kickChatMember(prop.chat_id, prop.replyUserId, {until_date: Math.round((Date.now() + ms(prop.timeban + " days"))/1000)}).then(function(result){
                app.bot.sendMessage(prop.chat_id, "❌ " + prop.replyUserName + " ha sido baneado durante " + prop.timeban + " días.", desban)
            })

            app.bot.on('callback_query', function onCallbackQuery(desbanear){
                var data = desbanear.data.split(":");

                const properties = {
                    'accion': data[0],
                    'userId': data[1],
                    'idFrom': data[2],
                    'idChat': data[3],
                    'replyName': data[4],
                    'text': data[5]
                };
                var msg = desbanear.message

                const opts = {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id
                };

                if (properties.accion == 'desban'){
                    app.bot.getChatMember(prop.chat_id, desbanear.from.id).then(function(infouser){
                        if (infouser.user.id == properties.idFrom){
                            app.bot.deleteMessage(prop.chat_id, prop.messageId)
                            app.bot.unbanChatMember(prop.chat_id, properties.userId).then(function(resolve){
                                app.bot.editMessageText("El usuario " + properties.replyName + " ha sido desbaneado", opts).then(function(deleteMessage){ 
                                    setTimeout(function(){
                                        app.bot.deleteMessage(properties.idChat, desbanear.message_id)
                                    },120000)
                                })
                            })
                        }
                        else {
                            app.bot.answerCallbackQuery(desbanear.id, {text: properties.text, show_alert: true})
                        }
                    })
                }
            })
        } else {
            app.bot.deleteMessage(prop.chat_id, prop.messageId)
            app.bot.sendMessage(prop.chat_id, "🔔 Comando solo para administradores y creador")
        }
    })
});

app.bot.onText(/^\!unban|^\/unban/, function(msg){
    if (msg.reply_to_message == undefined){
        return;
    }

    const opts = {
        'replyUserName': msg.reply_to_message.from.first_name,
        'userId': msg.reply_to_message.from.id,
        'messageId': msg.message_id,
        'chatId': msg.chat.id,
        'myId': msg.from.id,
        'myName': msg.from.first_name
    }

    app.bot.getChatMember(opts.chatId, opts.myId).then(function(data){
        if ((data.status == 'creator') || (data.status == 'administrator')){
            app.bot.unbanChatMember(opts.chatId, opts.userId).then(function(result){
                app.bot.deleteMessage(opts.chatId, opts.messageId);
                app.bot.sendMessage(opts.chatId, opts.replyUserName + " ya no está baneado.");
            })
        }
        else {
            app.bot.deleteMessage(opts.chatId, opts.messageIdmessageId);
            app.bot.sendMessage(opts.chatId, "Lo siento " + opts.myName + " no eres administrador");
        }
    });
});