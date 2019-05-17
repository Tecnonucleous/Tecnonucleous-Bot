'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!poll|^\/poll/, function (msg) {

    var texto = msg.text.substring(5);

    var array = texto.split(";"); // Conver text to Array
    if (array.length >= 3) { // Check if array have 3 elements

        //Loop to remove spaces from the array at the end and beginning
        for (var i = 0; i <= (array.length - 1); i++) {
            var mod_array = array[i].trim();  // Temporarily save the text without spaces
            array.splice(i, 1, mod_array); // Save the text without spaces in "array"
        }
        // Loop to trim the text within the values ​​allowed by the API
        for (var i = 0; i <= (array.length - 1); i++) {
            if (i == 0) {
                var aux = array[i].substr(0, 254); // "Cut" the string of the question due max 255 characters allow
                array.splice(i, 1, aux);
            }
            else {
                var aux = array[i].substr(0, 99); // "Cut" the string options due max 100 characters allow
                array.splice(i, 1, aux);
            }
        }

        var options_poll = []; // Create an empty array to save the answers

        // Loop to save answers in new array called "options poll"
        for (var i = 1; i <= (array.length - 1); i++) {  // "var i" strart with element 1 of the array, because element 0 is the question
            if (i <= 10) { // Only save array positions 1 to 10
                var aux = array[i];
                options_poll.splice(i - 1, 1, aux);
            }
        }

        // Checking Chat Type -- Comprobación del tipo de Chat
        if (msg.chat.type == 'private') {
            app.bot.sendMessage(msg.chat.id, app.i18n.__('Command only available for supergroups'));
        }
        else {
            app.bot.deleteMessage(msg.chat.id, msg.message_id);
            app.bot.sendPoll(msg.chat.id, array[0], options_poll, { parse_mode: "Markdown" });
        }
        // Error when the array has less than 3 elements
    } else {
        app.bot.sendMessage(msg.chat.id, app.i18n.__('⛔️ Error, the poll has to have a minimum of two options\n Example: /poll Question; Answer 1; Answer 2'), { parse_mode: "Markdown" });
    }
});

app.bot.onText(/^\!endpoll|^\/endpoll/, function (msg) {
    var chat_id = msg.chat.id;
    try {
        var replyId_messageId = msg.reply_to_message.message_id;
        if (msg.reply_to_message.poll.is_closed == true) {
            app.bot.sendMessage(msg.chat.id, "Encuesta previamente cerrada");
        }
        if (msg.reply_to_message.poll.is_closed == false) { // Check if poll is not close
            app.bot.stopPoll(msg.chat.id, replyId_messageId); // Close Poll
        }
    } catch (error) {
        app.bot.sendMessage(chat_id, app.i18n.__('You need to reply to poll message with the command /endpoll'));
    }
});