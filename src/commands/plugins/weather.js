'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\/clima (.+)/, function(msg, match){
    const prop = {
        'chat_id': msg.chat.id,
        'city': match[1],
        'TypeTemp': 'C',
        'lang': 'ES'
    };

    app.weather.find({search: prop.city , degreeType: prop.TypeTemp, lang: prop.lang}, function(err, result){
        if (err) console.log(err)
        console.log(result)

        const opts = {
            'localizacion': '',
            'latitud': '',
            'longitud': '',
            'temperatura': '',
            'sensaciontermica': '',
            'humedad': '',
            'direccion_viento': '',
            'img_day': '',
            'forecast': ''
        };

        for (var i = 0; i < result.length; i++){
            opts.localizacion = result[i].location.name
            opts.latitud = result[i].location.lat
            opts.longitud = result[i].location.long
            opts.temperatura = result[i].current.temperature + "ºC, " + result[i].current.skytext
            opts.sensaciontermica = result[i].current.feelslike
            opts.humedad = result[i].current.humidity
            opts.direccion_viento = result[i].current.winddisplay
            opts.img_day = result[i].current.imageUrl
            opts.forecast = result[i].forecast
        }

        
        const button = {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [[{text: "Ver la semana", callback_data: 'week'}]]
            }
        }
        var text = "📆 *Día y hora:* " + app.moment().format('LLL') + "\n[" + "🔔" + "]" + "(" + opts.img_day + ")" + " *Localización:* " + opts.localizacion + "\n\n🌎 *Latitud:* " + opts.latitud + " *Longitud:* " + opts.longitud + "\n🌡 *Temperatura:* " + opts.temperatura + "\n☁️ *Sensación térmica:* " + opts.sensaciontermica + "\n🌫 *Humedad*: " + opts.humedad + "\n🎏 *Dirección del viento* " + opts.direccion_viento

        app.bot.sendMessage(prop.chat_id, text, button)


        app.bot.on('callback_query', function onCallbackQuery(forecastWeek){
            const data = forecastWeek.data
            const msg = forecastWeek.message
            var forecast = opts.forecast

            const proper = {
                parse_mode: 'Markdown',
                chat_id: msg.chat.id,
                message_id: msg.message_id
            }

            if (data == 'week'){

                var forecastReport = ""

                for (var o = 2; o < forecast.length; o++){
                    forecastReport += "📆 *Día de la previsión:* " + forecast[o].date + ", " + forecast[o].day + "\n📉*Temperatura mínima:* " + forecast[o].low + "ºC" + "\n*📈Temperatura máxima:* " + forecast[o].high + "ºC" + "\n*⭐️ Situación:* " + forecast[o].skytextday + "\n*🌧 Precipitaciones:* " + forecast[o].precip + "%" + "\n\n"
                }
                app.bot.sendMessage(prop.chat_id, "🌍 *Localización:* " + opts.localizacion + "\n\n" + forecastReport, proper)
                
            }
            
        })
        
    })
    
});