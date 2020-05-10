'use strict';

const app = require('../../settings/app')

app.bot.onText(/^\!imgur|^\/imgur/, function (msg) {
    if (msg.reply_to_message !== undefined) {
        var chat = {};
        chat.id = msg.chat.id;
        chat.message_id = msg.message_id;
        var photo_size = {};
        photo_size.LQuality = msg.reply_to_message.photo[0];
        photo_size.MQuality = msg.reply_to_message.photo[1];
        photo_size.HQuality = msg.reply_to_message.photo[2];
        photo_size.BQuality = msg.reply_to_message.photo[3];

        if (photo_size.BQuality == undefined) {
            var dimensionHQuality = `${photo_size.HQuality.width}:${photo_size.HQuality.height}`;
            app.bot.getFileLink(photo_size.HQuality.file_id).then((urlPhoto) => {
                app.imgur.uploadUrl(urlPhoto).then((imgURupload) => {
                    var url = imgURupload.data.link;

                    var dimensHMQuality = dimensionHQuality.split(":");
                    var measures = {};
                    measures.width = dimensHMQuality[0];
                    measures.height = dimensHMQuality[1];

                    app.bot.sendChatAction(chat.id, 'upload_photo').then((actionPhoto) => {
                        if (actionPhoto == true) {
                            var text = `${app.i18n.__('*Quality: Medium-High*\n*Dimensions of the image:* \n')}${measures.width}x${measures.height}${app.i18n.__('\n\n*Link of the photo uploaded to Imgur:* " : ')}${url}`
                            app.bot.sendMessage(chat.id, `${app.i18n.__('*Quality: Medium-High*\n*Dimensions of the image:* \n')}${measures.width}x${measures.height}${app.i18n.__('\n\n*Link of the photo uploaded to Imgur:* " : ')}${url}`, {
                                parse_mode: 'Markdown',
                                disable_web_page_preview: true
                            }).catch((err) => {
                                if (err) {
                                    console.log(err.message)
                                }
                            })
                        }
                    })
                })
            })
        } else if (photo_size.BQuality !== undefined) {
            var dimensionBQuality = `${photo_size.BQuality.width}:${photo_size.BQuality.height}`;
            var dimensionHSQuality = dimensionBQuality.split(":");
            var measures = {};
            measures.width = dimensionHSQuality[0];
            measures.height = dimensionHSQuality[1];


            app.bot.getFileLink(photo_size.BQuality.file_id).then((urlPhoto) => {
                app.imgur.uploadUrl(urlPhoto).then((imgURUpload) => {
                    var url = imgURUpload.data.link;

                    app.bot.sendChatAction(chat.id, 'upload_photo');
                    app.bot.sendMessage(chat.id, `${app.i18n.__('*Quality: Super-High*\n*Dimensions of the image:* \n')}${measures.width}x${measures.height}${app.i18n.__('\n\n*Link of the photo uploaded to Imgur:* " : ')}${url}`, {
                        parse_mode: 'Markdown',
                        disable_web_page_preview: true
                    }).catch((err) => {
                        if (err){
                            console.log(err.message)
                        }
                    })
                })
            })
        }
    }
});
