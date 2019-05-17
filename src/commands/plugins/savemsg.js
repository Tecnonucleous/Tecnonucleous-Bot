'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!save|^\/save/, function(msg) {
    try {
        var userid = msg.from.id; // id of user
        var chat_id = msg.chat.id; // id of the original "msg" chat to forward
        var msg_id = msg.reply_to_message.message_id; // id of the msg to forward
        
        app.bot.forwardMessage(userid,chat_id,msg_id).then(function(resp) {
            // console.log("OK");
          }).catch(function(error) {
            if (error.response && error.response.statusCode === 403) { //  Error 403: Bot was blocked by the user
                app.bot.sendMessage(chat_id, app.i18n.__('⛔️ I can not send you messeges, you should start me first in private'));
            }
          });  
    } catch (error) {
        app.bot.sendMessage(chat_id, app.i18n.__('⛔️ Error, you need to reply a messege for save it'));
    }

});