'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\/mute (.+)|^\!mute (.+)/, function(msg, match){

    if (msg.reply_to_message == undefined){
        return;
    }
    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'time': match[1],
        'timetwo': match[2],
        'replyFromId': msg.reply_to_message.from.id,
        'replyFromName': msg.reply_to_message.from.first_name,
        'messageId': msg.message_id
    }
    
    app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(report){
        
        if ((report.status == 'creator') || (report.status == 'administrator')){
        
            var permisosFalse = {};
            permisosFalse.can_send_messages = false;
            permisosFalse.can_send_media_messages = false;
            permisosFalse.can_send_other_messages = false;
            permisosFalse.can_add_web_page_previews = false;
            permisosFalse.can_send_polls = false;
            const ms = require("ms");

            app.bot.restrictChatMember(prop.chat_id, prop.replyFromId, {until_date: Math.round((Date.now() + ms(prop.time || prop.timetwo + " hour"))/1000)}, permisosFalse).then(function(restricted){

                app.bot.getChatMember(prop.chat_id, prop.replyFromId).then(function(infouser){
                    if ((infouser.status == 'restricted')){
                        if (prop.time < 2){
                            app.bot.deleteMessage(prop.chat_id, prop.messageId)
                            app.bot.sendMessage(prop.chat_id, prop.replyFromName + " ha sido muteado durante " + prop.time + " hora").then(function(deleteMessage){
                                setTimeout(function(){
                                    app.bot.deleteMessage(prop.chat_id, deleteMessage.message_id)
                                }, 120000)
                            })
                        }

                        if (prop.time > 2){
                            app.bot.deleteMessage(prop.chat_id, prop.messageId)
                            app.bot.sendMessage(prop.chat_id, prop.replyFromName + " ha sido muteado durante " + prop.time + " horas").then(function(deleteMessage){
                                setTimeout(function(){
                                    app.bot.deleteMessage(prop.chat_id, deleteMessage.message_id)
                                }, 120000)
                            })
                        }
                            
                        if (prop.timetwo < 2){
                            app.bot.deleteMessage(prop.chat_id, prop.messageId)
                            app.bot.sendMessage(prop.chat_id, prop.replyFromName + " ha sido muteado durante " + prop.timetwo + " hora").then(function(removeMessage){
                                setTimeout(function(){
                                    app.bot.deleteMessage(prop.chat_id, removeMessage.message_id)
                                }, 120000)
                            })
                        }
                             
                        if (prop.timetwo > 2){
                            app.bot.deleteMessage(prop.chat_id, prop.messageId)
                            app.bot.sendMessage(prop.chat_id, prop.replyFromName + " ha sido muteado durante " + prop.timetwo + " horas").then(function(removeMessage){
                                setTimeout(function(){
                                    app.bot.deleteMessage(prop.chat_id, removeMessage.message_id)
                                }, 120000)
                            })
                        }
                    } else {
                        return;
                    }
                })
            })
        } else {
            app.bot.deleteMessage(prop.chat_id, prop.messageId)
            app.bot.sendMessage(prop.chat_id, "Lo siento, no eres administrador").then(function(removeMessageUser){
                setTimeout(function(){
                    app.bot.deleteMessage(prop.chat_id, removeMessageUser.message_id)
                }, 120000)
            })
        };
    })
});

app.bot.onText(/^\/unmute|^\!unmute/, function(msg){

if (msg.reply_to_message == undefined){
        return;
    }

    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'replyFromId': msg.reply_to_message.from.id,
        'replyFromName': msg.reply_to_message.from.first_name,
        'messageId': msg.message_id
    }

    app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(report){
        
        if ((report.status == 'creator') || (report.status == 'administrator')){
        
            var permisosTrue = {};
            permisosTrue.can_send_messages = true
            permisosTrue.can_send_media_messages = true
            permisosTrue.can_send_other_messages = true
            permisosTrue.can_add_web_page_previews = true
            const ms = require("ms");

            app.bot.restrictChatMember(prop.chat_id, prop.replyFromId, permisosTrue).then(function(unrestricted){

                app.bot.getChatMember(prop.chat_id, prop.replyFromId).then(function(infouser){
                    
                    if ((infouser.status == 'member')){
                        app.bot.sendMessage(prop.chat_id, prop.replyFromName + " ha sido desmuteado")
                    } else {
                        return;
                    }
                })
            })
        } else {
            app.bot.deleteMessage(prop.chat_id, prop.messageId)
            app.bot.sendMessage(prop.chat_id, "Lo siento, no eres administrador").then(function(removeMessageUser){
                setTimeout(function(){
                    app.bot.deleteMessage(prop.chat_id, removeMessageUser.message_id)
                }, 120000)
            })
        };
    })
});
    
