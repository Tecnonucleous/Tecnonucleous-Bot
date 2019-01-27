'use strict';

const app = require('../../settings/app');
/**
 * Información para el correcto funcionamiento de este plugin:
 * Recuerda aplicar en el archivo 'app.js'
 * const request = require('request')
 *
 * Más abajo, en 'modules.exports', se nombra a request y ya podras utilizarlo en todas partes mediante "app.request"
 * Apartir de aquí, debería funcionarte correctamente el código.
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
                                {text: "🗂 Archivar", callback_data: 'archived'}
                            ]
                        ]
                    }
                };

                app.bot.sendMessage(prop.chat_id, "❌Esta URL no está archivada. \n\n*¿Quieres archivarla?*", button_archived)

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
                                app.bot.editMessageText("✅ URL archivada correctamente\n\nPulse el botón para ver más información", opts)
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
                                app.bot.editMessageText(archive_url + "\n📆 Fecha: " + fulldate + "\n⏱ Hora: " + fulltime, opts_edit);
                            } else {
                                app.bot.editMessageText(archive_url + "\n📆 Fecha: " + fulldate + "\n⏱ Hora: " + fulltime, opts_edit);
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
                    app.bot.sendMessage(prop.chat_id, archive_url + "\n📆 Fecha: " + fulldate + "\n⏱ Hora: " + fulltime);
                } else {
                    app.bot.deleteMessage(prop.chat_id, prop.message_id)
                    app.bot.sendMessage(prop.chat_id, archive_url + "\n📆 Fecha: " + fulldate + "\n⏱ Hora: " + fulltime);
                }
            }




        /*

        */





    })


}); // End
