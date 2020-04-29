'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!mod|^\/mod/, (msg) => {
    if (msg.reply_to_message !== undefined) {
        var permisos = require('../../settings/perms');
        var chat = {};
        chat.id = msg.chat.id;
        chat.type = msg.chat.type;
        chat.message_id = msg.message_id;

        var user = {};
        user.id = msg.from.id;
        user.reply = {};
        user.reply.id = msg.reply_to_message.from.id;
        user.reply.name = msg.reply_to_message.from.first_name;

        app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
            if ((infoUser.status == 'creator')) {
                if (chat.type == 'supergroup') {
                    app.bot.promoteChatMember(chat.id, user.reply.id, permisos.true).then((newAdmin) => {
                        if (newAdmin == true) {
                            app.bot.deleteMessage(chat.id, chat.message_id);
                            app.bot.sendMessage(chat.id, `✅ ${user.reply.name}${app.i18n.__(' , you are now an administrator.')}`)
                        }
                    }).catch((err) => {
                        if (err) {
                            app.bot.sendMessage(chat.id, `${app.i18n.__('🤖 The bot does not have permissions to add new administrators')}`, {
                                parse_mode: 'HTML'
                            })
                        }
                    })
                } else {
                    app.bot.sendMessage(chat.id, `${app.i18n.__('Command only available for supergroups')}`)
                }
            } else {
                app.bot.sendMessage(chat.id, `${app.i18n.__('⛔️ Only the creator of the group can use this command')}`)
            }
        })
    } else {
        return;
    }
});

app.bot.onText(/^\!unmod|^\/unmod/, (msg) => {
    if (msg.reply_to_message !== undefined) {
        var permisos = require('../../settings/perms');
        var chat = {};
        chat.id = msg.chat.id;
        chat.type = msg.chat.type;
        chat.message_id = msg.message_id;

        var user = {};
        user.id = msg.from.id;
        user.reply = {};
        user.reply.id = msg.reply_to_message.from.id;
        user.reply.name = msg.reply_to_message.from.first_name;

        app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
            if ((infoUser.status == 'creator')){
                if (chat.type == 'supergroup'){
                    app.bot.promoteChatMember(chat.id, user.reply.id, permisos.false).then((degradateUser) => {
                        if (degradateUser == true){
                            app.bot.deleteMessage(chat.id, chat.message_id);
                            app.bot.sendMessage(chat.id, `❌ ${user.reply.name}${app.i18n.__(' , you are not an administrator')}`)
                        }
                    })
                } else {
                    app.bot.sendMessage(chat.id, `${app.i18n.__('Command only available for supergroups')}`)
                }
            } else {
                app.bot.sendMessage(chat.id, `${app.i18n.__('⛔️ Only the creator of the group can use this command')}`)
            }
        })
    } else {
        return;
    }
})