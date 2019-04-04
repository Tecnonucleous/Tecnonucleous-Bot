'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!progreso|^\/progreso/, (msg) => {
// Get the date of our computer -> Obtenemos la fecha de nuestro equipo
const initialDate = new Date(new Date().getFullYear(), 0, 1);
// Calculate the progress of the year -> Calculamos el progreso que llevamos del año
var progreso_ano = Math.floor((((new Date() - initialDate) / (1000 * 60 * 60 * 24)) * 100) / 365);
// Calculate the remaining percentage to finish the year -> Calculamos el porcentaje restante que queda para finalizar el año
var resto_progreso_fin_ano = 100 - parseInt(progreso_ano);
// Start creation bar progress year -> Inicio creación barra progreso año
	let progreso_actual = progreso_ano;
    let yearBar='';
      for(let i=5; i<=100; i+=5){
        yearBar = (i<progreso_actual)?yearBar+'▓':yearBar+'░';
			//console.log(yearBar);
      }
var barra_progreso = yearBar + " " + progreso_ano + "%";
	if(msg.chat.type == 'private'){
  	app.bot.sendMessage(msg.chat.id, app.i18n.__('📆 The current progress of the year is: \n\n') + barra_progreso);
	}
	else{
		app.bot.deleteMessage(msg.chat.id, msg.message_id);
		app.bot.sendMessage(msg.chat.id, app.i18n.__('📆 The current progress of the year is: \n\n') + barra_progreso);
	}
 });
