'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\/mute (.+)|^\!mute (.+)/, function (msg, match) {
    if (msg.reply_to_message !== undefined) {
        var perms = require('../../settings/perms');
        var chat = {};
        chat.id = msg.chat.id;
        chat.message_id = msg.message_id;

        var user = {};
        user.id = msg.from.id;
        user.reply = {};
        user.reply.id = msg.reply_to_message.from.id;
        user.reply.name = msg.reply_to_message.from.first_name;

        var options = {};
        options.time1 = match[1];
        options.time2 = match[2];

        app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
            if ((infoUser.status == 'creator') || (infoUser.status == 'administrator')) {
                var ms = require('ms');

                app.bot.restrictChatMember(chat.id, user.reply.id, {
                    until_date: Math.round((Date.now() + ms(options.time || options.time2 + " hour")) / 1000)
                }, perms.mute.false).then((restrictMuteUser) => {
                    if (restrictMuteUser == true) {

                        app.bot.getChatMember(chat.id, user.reply.id).then((infoUserRestricted) => {
                            if ((infoUserRestricted.status == 'restricted')) {
                                if (options.time1 < 2 || options.time2 < 2) {
                                    app.bot.deleteMessage(chat.id, chat.message_id);
                                    app.bot.sendMessage(chat.id, `${app.i18n.__('The User: ')}${user.reply.name} ${app.i18n.__('is mute during ')}${options.time1 || options.time2} ${app.i18n.__('hour')}`).then((continueMessage) => {
                                        setTimeout(() => {
                                            app.bot.deleteMessage(continueMessage.chat.id, continueMessage.message_id)
                                        }, 120000)
                                    })
                                }
                                else if (options.time1 >= 2 || options.time2 >= 2) {
                                    app.bot.deleteMessage(chat.id, chat.message_id);
                                    app.bot.sendMessage(chat.id, `${app.i18n.__('The User: ')}${user.reply.name} ${app.i18n.__('is mute during ')}${options.time1 || options.time2} ${app.i18n.__('hours')}`).then((continueMessage) => {
                                        setTimeout(() => {
                                            app.bot.deleteMessage(continueMessage.chat.id, continueMessage.message_id)
                                        }, 120000)
                                    })
                                }
                            } else {
                                return;
                            }
                        })
                    }
                })
            } else {
                app.bot.deleteMessage(chat.id, chat.message_id);
                app.bot.sendMessage(chat.id, `${app.i18n.__('⛔️ Only the creator of the group can use this command')}`).then((continueMessageNotAdmin) => {
                    setTimeout(() => {
                        app.bot.deleteMessage(continueMessageNotAdmin.chat.id, continueMessageNotAdmin.message_id)
                    }, 120000)
                })
            }
        })
    } else {
        return;
    }
});

app.bot.onText(/^\/unmute|^\!unmute/, function (msg) {
    if (msg.reply_to_message !== undefined) {
        var chat = {};
        chat.id = msg.chat.id;
        chat.message_id = msg.message_id;
        var user = {};
        user.id = msg.from.id;
        user.reply = {};
        user.reply.id = msg.reply_to_message.from.id;
        user.reply.name = msg.reply_to_message.from.first_name;

        app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
            if ((infoUser.status == 'creator') || (infoUser.status == 'administrator')) {
                var perms = require('../../settings/perms');

                app.bot.restrictChatMember(chat.id, user.reply.id, perms.mute.true).then((unrestrictedUser) => {
                    if (unrestrictedUser == true) {
                        app.bot.getChatMember(chat.id, user.reply.id).then((infoUserNew) => {
                            if ((infoUserNew.status == 'member')) {
                                app.bot.sendMessage(chat.id, `${app.i18n.__('The User: ')}${user.reply.name} ${app.i18n.__("It's demutualized")}`)
                            } else {
                                return;
                            }
                        })
                    }
                })
            } else {
                app.bot.deleteMessage(chat.id, chat.message_id);
                app.bot.sendMessage(chat.id, `${app.i18n.__('⛔️ Only the creator of the group can use this command')}`).then((removeMessageUser) => {
                    setTimeout(() => {
                        app.bot.deleteMessage(removeMessageUser.chat.id, removeMessageUser.message_id)
                    }, 120000)
                })
            }
        })
    }
});