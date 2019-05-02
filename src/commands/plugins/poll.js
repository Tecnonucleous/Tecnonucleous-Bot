'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!poll|^\/poll/, function(msg) {

var texto = msg.text.substring(5);

var array = texto.split(";"); // Conver text to Array
if (array.length >= 3) { // Check if array have 3 elements

// Bucle para quitar los espacios del array al final y al principio
for (var i = 0; i <= (array.length - 1); i++) {
    var mod_array = array[i].trim();  // Guardamos en una variable temporalmente el texto sin los espacios
    array.splice(i, 1,mod_array); // Guardamos en el array el texto sin espacios
}
// Bucle para recortar el texto dentro de los valores permitidos por la API
for (var i = 0; i <= (array.length - 1); i++){
    if (i == 0) {
       var aux = array[i].substr(0,254); // Cortamos la cadena de la pregunta debido max 255 caracteres
       array.splice(i, 1,aux);
    }
    else{
        var aux = array[i].substr(0,99); // cortamos cadena opciones 100 caracteres permitidos
        array.splice(i, 1,aux);
    }
}

var options_poll = []; // Creamos un array vacio para poder guardar las respuestas

// Creamos un bucle para guardar las opciones en un nuevo array llamado "options poll"
for (var i = 1; i <= (array.length - 1); i++){  // "var i" strart with element 1 of the array, because element 0 is the question
    if (i <= 10) { // Only save array positions 1 to 10
        var aux = array[i];
        options_poll.splice(i - 1, 1,aux); 
    } 
}

console.log(options_poll);
// Checking Chat Type -- Comprobación del tipo de Chat
if(msg.chat.type == 'private'){
    app.bot.sendMessage(msg.chat.id, app.i18n.__('Command only available for supergroups'));
  }
else{
    app.bot.deleteMessage(msg.chat.id, msg.message_id);
  app.bot.sendPoll(msg.chat.id, array[0], options_poll,{parse_mode : "Markdown"});
 }
// Error cuando el array tiene menos de 3 elementos
}else{
    app.bot.sendMessage(msg.chat.id, "Error");
}
});

app.bot.onText(/^\!endpoll|^\/endpoll/, function(msg) {
    
    var replyId_messageId = msg.reply_to_message.message_id;
	app.bot.stopPoll(msg.chat.id,replyId_messageId);

});