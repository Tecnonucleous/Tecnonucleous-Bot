'use strict';

const app = require('../../settings/app')

app.bot.onText(/^\!chatid|^\/chatid/, function (msg) {
    var chat = {};
    chat.id = msg.chat.id;
    chat.title = msg.chat.title;
    chat.type = msg.chat.type;
    chat.message_id = msg.message_id;

    // Checking Chat Type -- Comprobación del tipo de Chat
    if (chat.type == 'private') {
        app.bot.sendMessage(chat.id, `${app.i18n.__('👤 Chat name: ')}${chat.title}\n└ ChatID: <code>${chat.id}</code>`, { parse_mode: 'HTML' });
    }
    else {
        app.bot.deleteMessage(chat.id, chat.message_id);
        app.bot.sendMessage(chat.id, `${app.i18n.__('👤 Chat name: ')}${chat.title}\n└ ChatID: <code>${chat.id}</code>`, { parse_mode: 'HTML' });
    }
});

app.bot.onText(/^\!getid|^\/getid/, function (msg) {
    var chat = {};
    chat.id = msg.chat.id;
    chat.message_id = msg.message_id;
    chat.type = msg.chat.type;
    var user = {}
    user.id = msg.from.id;
    user.name = msg.from.first_name;
    //  Checking Alias -- Comprobación de Alias
    if (msg.from.username !== undefined) {
        user.alias = `@${msg.from.username}`;
    } else {
        user.alias = `${app.i18n.__('Alias not established')}`
    }

    // Checking Chat Type -- Comprobación del tipo de Chat
    if (chat.type == 'private') {

        app.bot.sendMessage(chat.id, `${app.i18n.__('👤 Username: ')}${user.name}\n├ UserID: <code>${user.id}</code>\n└ ${app.i18n.__('User alias: ')}${user.alias}`, { parse_mode: 'HTML' })
    }
    else {
        app.bot.deleteMessage(chat.id, chat.message_id);
        app.bot.sendMessage(chat.id, `${app.i18n.__('👤 Username: ')}${user.name}\n├ UserID: <code>${user.id}</code>\n└ ${app.i18n.__('User alias: ')}${user.alias}`, { parse_mode: 'HTML' })
    }

});
