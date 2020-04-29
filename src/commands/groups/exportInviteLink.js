'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!link|^\/link/, (msg) => {
    var chat = {};
    chat.id = msg.chat.id;
    chat.type = msg.chat.type;
    chat.message_id = msg.message_id;

    var user = {};
    user.id = msg.from.id;

    if ((chat.type == 'supergroup') || (chat.type == 'group')) {
        app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
            if ((infoUser.status == 'creator') || (infoUser.status == 'administrator')) {
                app.bot.exportChatInviteLink(chat.id).then((url_export) => {
                    app.bot.sendMessage(chat.id, `${app.i18n.__('Group link: \n')} ${url_export.link}`);
                })
            } else {
                app.bot.deleteMessage(chat.id, chat.message_id);
                app.bot.sendMessage(chat.id, `${app.i18n.__('Command only available for admins and creator')}`)
            }
        })
    }

})
