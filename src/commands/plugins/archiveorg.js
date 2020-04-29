'use strict';
var app = require('../../settings/app');

/**
 * Information for the correct functioning of this plugin:
 * Remember to apply in the 'app.js' file
 * const request = require ('request')
 * From here, the code should work correctly.
 *
 * Below, in 'modules.exports', request is named and you can use it everywhere with "app.request"
 * From there, the code should work correctly.
 */

app.bot.onText(/^\!archive (.+)/, (msg, match) => {
    var URL = require('../../settings/urls');
    
    var chat = {};
    chat.id = msg.chat.id;
    chat.type = msg.chat.type;
    chat.message_id = msg.message_id;
    var user = {};
    user.id = msg.from.id;
    user.page = match[1];

    var result_URL = {};
    result_URL.verification = `${URL.archiveORG.verificationURL}${user.page}`;
    result_URL.save = `${URL.archiveORG.saveURL}${user.page}`;

    app.rp(result_URL.verification, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var archived = JSON.parse(body);
            if (archived.archived_snapshots.closest == undefined) {
                var archivated_button = {};
                archivated_button.parse_mode = 'Markdown';
                archivated_button.reply_markup = {};
                archivated_button.reply_markup.inline_keyboard = [
                    [{ text: `${app.i18n.__('🗂 Archive')}`, callback_data: `archived` }]
                ];

                app.bot.sendMessage(chat.id, `${app.i18n.__('❌This URL is not archived. \n\n*Do you want to archive it?*')}`, { parse_mode: 'Markdown', reply_markup: archivated_button.reply_markup }).then((continueMessage) => {
                    app.bot.on('callback_query', (archivedModel) => {
                        var options = {};
                        options.data = archivedModel.data;
                        options.message = archivedModel.message;

                        if (options.data == 'archived') {
                            app.rp(result_URL.save, (error, response, body) => {
                                if (!error && response.statusCode == 200) {
                                    app.bot.editMessageText(`${app.i18n.__('✅ Archived URL correctly \n\nPress the button to see more information')}`, {
                                        chat_id: options.message.chat.id,
                                        message_id: options.message.message_id,
                                        parse_mode: 'Markdown',
                                        reply_markup: {
                                            inline_keyboard: [
                                                [{ text: `${app.i18n.__('View Log')}`, callback_data: `log_archivated` }]
                                            ]
                                        }
                                    })
                                }
                            }).end()
                        } else if (options.data == 'log_archivated') {
                            app.rp(result_URL.verification, (error, response, body) => {
                                if (!error && response.statusCode == 200) {
                                    var archive = JSON.parse(body);
                                    var data_archive = {};
                                    data_archive.url = archive.archived_snapshots.closest.url;
                                    data_archive.time = archive.archived_snapshots.closest.timestamp;
                                    data_archive.fulldate = data_archive.time.substring(6, 8).concat('-'.concat(data_archive.time.substring(4, 6).concat('-'.concat(data_archive.time.substring(0, 4)))));
                                    data_archive.fulltime = data_archive.time.substring(8, 10).concat(':'.concat(data_archive.time.substring(10, 12).concat(':'.concat(data_archive.time.substring(12, 14)))));

                                    if (chat.type == 'private') {
                                        app.bot.deleteMessage(chat.id, chat.message_id);
                                        app.bot.editMessageText(`${data_archive.url}${app.i18n.__('\n📆 Date: ')}${data_archive.fulldate}${app.i18n.__('\n⏱ Time: ')}${data_archive.fulltime}`, {
                                            chat_id: options.message.chat.id,
                                            message_id: options.message.message_id
                                        })
                                    } else {
                                        app.bot.editMessageText(`${data_archive.url}${app.i18n.__('\n📆 Date: ')}${data_archive.fulldate}${app.i18n.__('\n⏱ Time: ')}${data_archive.fulltime}`, {
                                            chat_id: options.message.chat.id,
                                            message_id: options.message.message_id
                                        })
                                    }
                                }
                            }).end()
                        }
                    })
                })
            } else {
                var data_archive = {};
                data_archive.url = archived.archived_snapshots.closest.url;
                data_archive.time = archived.archived_snapshots.closest.timestamp;
                data_archive.fulldate = data_archive.time.substring(6,8).concat('-'.concat(data_archive.time.substring(4,6).concat('-'.concat(data_archive.time.substring(0,4)))));
                data_archive.fulltime = data_archive.time.substring(8,10).concat(':'.concat(data_archive.time.substring(10,12).concat(':'.concat(data_archive.time.substring(12,14)))));

                if (chat.type == 'private'){
                    app.bot.sendMessage(chat.id, `${data_archive.url}${app.i18n.__('\n📆 Date: ')}${data_archive.fulldate}${app.i18n.__('\n⏱ Time: ')}${data_archive.fulltime}`)
                } else {
                    app.bot.deleteMessage(chat.id, chat.message_id);
                    app.bot.sendMessage(chat.id, `${data_archive.url}${app.i18n.__('\n📆 Date: ')}${data_archive.fulldate}${app.i18n.__('\n⏱ Time: ')}${data_archive.fulltime}`);
                }
            }
        }
    }).end()




})