'use strict';

const app = require('../../settings/app');
/**
 * Information for the correct functioning of this plugin:
 * Remember to apply in the 'app.js' file
 * const request = require ('request')
 * From here, the code should work correctly.
 *
 * Below, in 'modules.exports', request is named and you can use it everywhere with "app.request"
 * From there, the code should work correctly.
 */

app.bot.onText(/^\!archive (.+)/, function(msg, match){

    const prop = {
        'chat_id': msg.chat.id,
        'user_id': msg.from.id,
        'type_chat': msg.chat.type,
        'message_id': msg.message_id,
        'save_url': 'https://web.archive.org/save/',
        'verification_url': 'https://archive.org/wayback/available?url=',
        'page_user': match[1]
    };

    var url_result = prop.verification_url + prop.page_user
    var save_url_result = prop.save_url + prop.page_user

    app.request(url_result, function(error, response, body){
        var parseBody = JSON.parse(body);
            if (parseBody.archived_snapshots.closest == undefined){
                const button_archived = {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: app.i18n.__('🗂 Archive'), callback_data: 'archived'}
                            ]
                        ]
                    }
                };

                app.bot.sendMessage(prop.chat_id, app.i18n.__('❌This URL is not archived. \n\n*Do you want to archive it?*'), button_archived)

                app.bot.on('callback_query', function onCallbackQuery(archivated){
                    const data = archivated.data
                    const msg = archivated.message;

                    const opts = {
                        chat_id: msg.chat.id,
                        message_id: msg.message_id,
                        parse_mode: 'Markdown',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {text: "Ver Log", callback_data: 'log_archivated'}
                                ]
                            ]
                        }
                    };

                    if (data == 'archived'){
                        app.request(save_url_result, function(error, response, html){
                            if (!error && response.statusCode == 200){
                                app.bot.editMessageText(app.i18n.__('✅ Archived URL correctly \n\nPress the button to see more information'), opts)
                            }
                        })
                    } else if (data == 'log_archivated'){
                        const opts_edit = {
                            chat_id: msg.chat.id,
                            message_id: msg.message_id
                        }
                        app.request(url_result, function(error, response, body){
                            var parsedBody = JSON.parse(body);

                            var archive_url = parsedBody.archived_snapshots.closest.url;
                            var archive_time = parsedBody.archived_snapshots.closest.timestamp;
                            var fulldate = archive_time.substring(6,8).concat('-'.concat(archive_time.substring(4,6).concat('-'.concat(archive_time.substring(0,4)))));
                            var fulltime = archive_time.substring(8,10).concat(':'.concat(archive_time.substring(10,12).concat(':'.concat(archive_time.substring(12,14)))));
                            if (prop.type_chat == 'private'){
                                app.bot.deleteMessage(prop.chat_id, prop.message_id);
                                app.bot.editMessageText(archive_url + app.i18n.__('\n📆 Date: ') + fulldate + app.i18n.__('\n⏱ Time: ') + fulltime, opts_edit);
                            } else {
                                app.bot.editMessageText(archive_url + app.i18n.__('\n📆 Date: ') + fulldate + app.i18n.__('\n⏱ Time: ') + fulltime, opts_edit);
                            }
                        })
                    }
                })
            }
            else {
                var archive_url = parseBody.archived_snapshots.closest.url;
                var archive_time = parseBody.archived_snapshots.closest.timestamp
                var fulldate = archive_time.substring(6,8).concat('-'.concat(archive_time.substring(4,6).concat('-'.concat(archive_time.substring(0,4)))));
                var fulltime = archive_time.substring(8,10).concat(':'.concat(archive_time.substring(10,12).concat(':'.concat(archive_time.substring(12,14)))));

                if (prop.type_chat == 'private'){
                    app.bot.sendMessage(prop.chat_id, archive_url + app.i18n.__('\n📆 Date: ') + fulldate + app.i18n.__('\n⏱ Time: ') + fulltime);
                } else {
                    app.bot.deleteMessage(prop.chat_id, prop.message_id)
                    app.bot.sendMessage(prop.chat_id, archive_url + app.i18n.__('\n📆 Date: ') + fulldate + app.i18n.__('\n⏱ Time: ') + fulltime);
                }
            }
        /*

        */
    })


}); // End
