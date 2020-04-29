'use strict';
const app = require('../../settings/app')

app.bot.onText(/\/start (.+)|^\/start/i, (msg, match) => {
    let invite_code;
    var chat = {};
    chat.id = msg.chat.id;
    var user = {};
    user.id = msg.from.id;
    user.name = msg.from.first_name;

    if (match[1] != undefined){
        invite_code = match[1];
        app.bot.sendMessage(chat.id, `${app.i18n.__('Hello ')} ${user.name} ${app.i18n.__(' with invitation code ')} ${invite_code}`)
    } else {
        app.bot.sendMessage(chat.id, `${app.i18n.__('Hello ')} ${user.name}`)
    }
})