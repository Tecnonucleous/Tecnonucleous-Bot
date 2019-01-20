'use strict';
const app = require('../../settings/app')

app.bot.onText(/\/start (.+)|\/start/i, function(msg, match){

var invite_code;

    const prop = {
            'chat_id': msg.chat.id,
            'user_id': msg.from.id,
            'userName': msg.from.first_name
    }
if (match[1] != undefined){
invite_code = match[1];
app.bot.sendMessage(prop.chat_id, "Hola " + prop.userName + " con código de invitación " + invite_code)
}
else{
    app.bot.sendMessage(prop.chat_id, "Hola " + prop.userName)
    }
});
