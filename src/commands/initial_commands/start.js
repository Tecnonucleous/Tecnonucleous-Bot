'use strict';
const app = require('../../settings/app')

app.bot.onText(/^\/start/, function(msg){

    const prop = {
            'chat_id': msg.chat.id,
            'user_id': msg.from.id,
            'userName': msg.from.first_name
    }

    app.bot.sendMessage(prop.chat_id, "Hola " + prop.userName)
});