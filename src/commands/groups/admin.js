'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\@admin|^\@admins/, function(msg){
    if (msg.reply_to_message == undefined){
        return;
    }
    
    const prop = {
        'chat_id': msg.chat.id,
        'from_id': msg.from.id,
        'fromName': msg.from.first_name,
        'messageId': msg.message_id,
        'replyId': msg.reply_to_message.from.id,
        'replyName': msg.reply_to_message.from.first_name,
        'replyText': msg.reply_to_message.text,
        'title': msg.chat.title
    }
        app.bot.getChatMember(prop.chat_id, prop.from_id).then(function(infouser){
            if (infouser.status == 'member'){
                app.bot.deleteMessage(prop.chat_id, prop.messageId);
                app.bot.sendMessage(prop.chat_id, "Avisando a los admins").then(function(deletemessage){
                    setTimeout(function(){
                        app.bot.deleteMessage(prop.chat_id, deletemessage.message_id);
                    },10000)
                });

                app.bot.getChatAdministrators(prop.chat_id).then(function(adminsgroup){
                    
                    const properties = {
                        'id': "",
                        'bot': "",
                        'name': "",
                        'alias': "",
                        'adminsinfo': "",
                        'opts': {parse_mode: 'Markdown'}
                    }

                    for (var i = 0; i < adminsgroup.length; i++){
                        properties.adminsinfo = adminsgroup[i].user
                        properties.id = adminsgroup[i].user.id 
                        properties.bot = adminsgroup[i].user.is_bot 
                        properties.name = adminsgroup[i].user.first_name
                        properties.alias = adminsgroup[i].user.username 
                        
                        if (properties.bot == false){
                            app.bot.sendMessage(properties.adminsinfo.id, "🛎 Te avisa: \n👨🏻‍💼 *Nombre:* " + prop.fromName + "\n🆔 *Id:* `" + prop.from_id + "`\n\n❌ *Infractor:*\n🙅🏻‍♂️ *Nombre:* " + prop.replyName + "\n🆔 *Id:* `" + prop.replyId + "`\n📃 *Texto con spam:* \n" + prop.replyText + "\n\n🏛 *En el grupo:* " + prop.title, properties.opts)
                        }
                    }
                })
            }
        })  
    
});