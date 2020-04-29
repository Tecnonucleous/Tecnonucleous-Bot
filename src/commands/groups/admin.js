'use strict';

const app = require('../../settings/app');

/**
 * Como está creado este comando solo funciona si el usuario que invoca el comando NO es ni creador ni administrador dle grupo debido a la siguiente condición <<if (infoUser.status == 'member')>>
 * 
 * Ahora, el bot crea los botones diferenciando de si el chat tiene un alias o no y en función de si es para el cliente oficial de Telegram o bien Telegram X. Esto sirve para poder acceder rápidamente al mensaje reportado.
 */

app.bot.onText(/^\@admin|^\@admins/, (msg) => {
  if (msg.reply_to_message !== undefined) {
    var chat = {};
    chat.id = msg.chat.id;
    chat.type = msg.chat.type;
    chat.username = msg.chat.username;
    chat.title = msg.chat.title;

    var user = {};
    user.id = msg.from.id;
    user.name = msg.from.first_name;
    user.reply = {};
    user.reply.id = msg.reply_to_message.from.id;
    user.reply.name = msg.reply_to_message.from.first_name;

    var message = {};
    message.id = msg.message_id;
    message.reply = {};
    message.reply.text = msg.reply_to_message.text;
    message.reply.message_id = msg.reply_to_message.message_id;

    var reply_buttons = {};
    reply_buttons.reply_markup = {};


    if (chat.type == 'supergroup' && chat.username == undefined) {
      var mod_id = String(chat.id).substring(4).trim();
      var deep_link = String(`tg://openmessage?chat_id=${mod_id}&message_id=${message.reply.message_id}`);

      reply_buttons.reply_markup.inline_keyboard = [
        [{ text: `${app.i18n.__('Go to the message')}`, url: `${deep_link}` }]
      ]

    } else if (chat.type == 'supergroup' && chat.username != null) {
      var deep_link = `https://t.me/${chat.username}/${message.reply.message_id}`;
      var deep_link_tgx = `t.me/${chat.username}/${message.reply.message_id}`

      console.log(deep_link_tgx)
      reply_buttons.reply_markup.inline_keyboard = [
        [{ text: `${app.i18n.__('Go to the message')}`, url: `${deep_link}` }],
        [{ text: `${app.i18n.__('Tg X: Go to the message')}`, url: `${deep_link_tgx}` }]
      ]

    }

    app.bot.getChatMember(chat.id, user.id).then((infoUser) => {
      if (infoUser.status == 'member') {
        app.bot.deleteMessage(chat.id, message.id);
        app.bot.sendMessage(chat.id, app.i18n.__(`Notifying administrators`)).then((contentMessage) => {
          setTimeout(() => {
            app.bot.deleteMessage(contentMessage.chat.id, contentMessage.message_id)
          }, 10000)
        }).then(() => {
          app.bot.getChatAdministrators(chat.id).then((administrators) => {

            for (var i = 0; i < administrators.length; i++) {
              if (administrators[i].user.is_bot == false) {
                app.bot.sendMessage(administrators[i].user.id, `${app.i18n.__('🛎 Alert: \n👨🏻‍💼 <b>Name:</b> ')} ${user.name}\n🆔 <b>Id:</b> <code>${user.id} ${app.i18n.__('</code>\n\n❌ <b>Offender:</b>\n🙅🏻‍♂️ <b>Name:</b> ')}${user.reply.name}\n🆔 <b>Id:</b> <code>${user.reply.id} ${app.i18n.__('</code>\n📃 <b>Text with spam:</b> \n')} ${message.reply.text} ${app.i18n.__('\n\n🏛 <b>In the group:</b> ')}${chat.title} \n`, {
                  parse_mode: 'HTML',
                  reply_markup: reply_buttons.reply_markup
                })
              }
            }
          })
        })
      } else {
        app.bot.sendMessage(chat.id, `${app.i18n.__('This command is exclusive for users. Its function is to send alerts to the admins.')}`)
      }
    })
  }
})