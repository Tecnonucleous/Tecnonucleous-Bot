'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\/ban (.+)|^\!ban (.+)/, function (msg, match) {
    if (msg.reply_to_message !== undefined) {
        var chat = {};
        chat.id = msg.chat.id;
        chat.message_id = msg.message_id;

        var user = {};
        user.id = msg.from.id;
        user.reply = {};
        user.reply.id = msg.reply_to_message.from.id;
        user.reply.name = msg.reply_to_message.from.first_name;

        var options = {};
        options.timeBan1 = match[1];
        options.timeBan2 = match[2];

        const ms = require('ms');

        app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
            if ((infoUser.status == 'creator') || (infoUser.status == 'administrator')) {
                app.bot.kickChatMember(chat.id, user.reply.id, {
                    until_date: Math.round((Date.now() + ms(options.timeBan1 || options.timeBan2 + " days")) / 1000)
                }).then((resultBanned) => {
                    console.log(resultBanned)
                    if (resultBanned == true) {

                        app.bot.sendMessage(chat.id, `❌ ${user.reply.name} ha sido baneado durante ${options.timeBan1 || options.timeBan2} días`, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: `Desbanear`, callback_data: `desbanned:${user.reply.id}:${user.id}:${chat.id}:${user.reply.name}` }]
                                ]
                            }
                        }).then(() => {
                            app.bot.on('callback_query', (desbannedAction) => {
                                var tool = {};
                                tool.chat = desbannedAction.message.chat;
                                tool.message = desbannedAction.message;
                                tool.userPulsed = desbannedAction.from;
                                tool.data = desbannedAction.data.split(":");

                                if (tool.data[0] == 'desbanned') {
                                    console.log(desbannedAction)
                                    /**
                                     * Solo creador y administradores pueden desbanear
                                     */
                                    app.bot.getChatMember(tool.chat.id, tool.userPulsed.id).then((infoUser) => {
                                        if ((infoUser.status == 'creator') || (infoUser.status == 'administrator')) {
                                            app.bot.deleteMessage(chat.id, chat.message_id);
                                            app.bot.unbanChatMember(chat.id, tool.data[1]).then((unbannedUser) => {
                                                if (unbannedUser == true) {
                                                    app.bot.editMessageText(`${app.i18n.__('The User: ')}${tool.data[4]} ha sido desbaneado`, {
                                                        chat_id: tool.chat.id,
                                                        message_id: tool.message.message_id
                                                    }).then((deleteEditMessage) => {
                                                        setTimeout(() => {
                                                            app.bot.deleteMessage(deleteEditMessage.chat.id, deleteEditMessage.message_id)
                                                        }, 120000)
                                                    })
                                                }
                                            })
                                        } else {
                                            app.bot.sendMessage(tool.chat.id, `${app.i18n.__('Command only available for admins and creator')}`).then((removeMessageUser) => {
                                                setTimeout(() => {
                                                    app.bot.deleteMessage(removeMessageUser.chat.id, removeMessageUser.message_id)
                                                },120000)
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            }
        })
    }

    /*
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
    */
});

app.bot.onText(/^\!unban|^\/unban/, function (msg) {
    if (msg.reply_to_message !== undefined){
        var chat = {};
        chat.id = msg.chat.id;
        chat.message_id = msg.message_id;

        var user = {};
        user.id = msg.from.id;
        user.name = msg.from.first_name;
        user.reply = {};
        user.reply.id = msg.reply_to_message.from.id;
        user.reply.name = msg.reply_to_message.from.first_name;

        app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
            if ((infoUser.status == 'creator') || (infoUser.status == 'administrator')){
                app.bot.unbanChatMember(chat.id, user.reply.id).then((unbanUser) => {
                    if (unbanUser == true){
                        app.bot.deleteMessage(chat.id, chat.message_id);
                        app.bot.sendMessage(chat.id, `${user.reply.name} ya no está baneado`)
                    }else {
                        app.bot.deleteMessage(chat.id, chat.message_id);
                        app.bot.sendMessage(chat.id, `${app.i18n.__('Sorry, you are not an admin')}`)
                    }
                })
            }
        })
    } else {
        return;
    }
});