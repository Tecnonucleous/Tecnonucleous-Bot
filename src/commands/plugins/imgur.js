'use strict';

const app = require('../../settings/app')

app.bot.onText(/^\!imgur|^\/imgur/, function(msg){

    if (msg.reply_to_message == undefined){
        return;
    }

    const prop = {
        'chat_id': msg.chat.id,
        'messageId': msg.message_id,
        'photoLowQuality': msg.reply_to_message.photo[0],
        'photoMediumQuality': msg.reply_to_message.photo[1],
        'photoHighQuality': msg.reply_to_message.photo[2],
        'photoBestQuality': msg.reply_to_message.photo[3]
    };

    //console.log(msg.reply_to_message.photo)

    if (prop.photoBestQuality == undefined){
        var dimensionsHighQuality = msg.reply_to_message.photo[2].width + ":" + msg.reply_to_message.photo[2].height;
        app.bot.getFileLink(prop.photoHighQuality.file_id).then(function(urlPhoto){
            //console.log(urlPhoto)
            app.imgur.uploadUrl(urlPhoto).then(function(imgurupload){
                var url = imgurupload.data.link;

                var dimensionesHighMedium = dimensionsHighQuality.split(":");
                var width = dimensionesHighMedium[0];
                var height = dimensionesHighMedium[1];

                app.bot.sendChatAction(prop.chat_id, 'upload_photo')
                app.bot.sendMessage(prop.chat_id, app.i18n.__('*Quality: Medium-High*\n*Dimensions of the image:* \n') + width + " x "+ height + app.i18n.__('\n\n*Link of the photo uploaded to Imgur:* " : ') + url,{parse_mode: 'Markdown', disable_web_page_preview: true});
            }).catch(function(err){
                console.log(err.message);
            })
        })
    };

    if (prop.photoBestQuality != undefined){
        var dimensionsBestQuality =  msg.reply_to_message.photo[3].width + ":" + msg.reply_to_message.photo[3].height;

        var dimensionesHighSuper = dimensionsBestQuality.split(":");
        var width = dimensionesHighSuper[0];
        var height = dimensionesHighSuper[1];

        app.bot.getFileLink(prop.photoBestQuality.file_id).then(function(urlPhoto){
            app.imgur.uploadUrl(urlPhoto).then(function(imgurupload){
                var url = imgurupload.data.link;

                app.bot.sendChatAction(prop.chat_id, 'upload_photo');
                app.bot.sendMessage(prop.chat_id, app.i18n.__('*Quality: Super-High*\n*Dimensions of the image:* \n') + width + " x "+ height + app.i18n.__('\n\n*Link of the photo uploaded to Imgur:* " : ') + url,{parse_mode: 'Markdown', disable_web_page_preview: true});
            }).catch(function(err){
                console.log(err.message);
            });
        });
    };
});
