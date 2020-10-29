var app = require('../../settings/app');
var database = require('../../database/database');

app.bot.onText(/^\/cpanel/, (msg) => {
    if (msg.chat.type == 'private') {
        app.bot.removeListener('callback_query');

        database.viewUser(msg.from).then((user) => {
            if (user.code == true) {
                var content = user.content;

                if (content.lang != undefined) {
                    app.i18n.setLocale(content.lang);
                    app.bot.sendMessage(msg.chat.id, app.i18n.__('change_lang_text'), {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: app.i18n.__('change_lang_button'), callback_data: `changeLang_${content.user_id}` }]
                            ]
                        }
                    }).then(() => {
                        cbLang();
                    })
                } else {
                    app.bot.sendMessage(content.user_id, `🇪🇸 Selecciona el idioma\n🇺🇸 Select the language`, {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: `🇪🇸`, callback_data: `setLang_es` }],
                                [{ text: `🇺🇸`, callback_data: `setLang_en` }]
                            ]
                        }
                    }).then(() => {
                        cbLang();
                    })
                }
            }
        })
    }
})

var cbLang = (() => {
    app.bot.addListener('callback_query', (lang_action) => {
        var menu = {};
        menu.chat = lang_action.message.chat;
        menu.message = lang_action.message;
        menu.user = lang_action.from;
        menu.data = lang_action.data.split("_");

        switch (menu.data[0]) {
            case 'setLang':
                database.setLanguage(menu.user, menu.data[1]).then((user) => {
                    if (user.code == true) {
                        var user_content = user.content;
                        console.log(user_content)
                        app.i18n.setLocale(user_content.lang)

                        app.bot.editMessageText(app.i18n.__('predet_lang'), {
                            parse_mode: 'HTML',
                            chat_id: menu.chat.id,
                            message_id: menu.message.message_id,
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: app.i18n.__('change_lang_button'), callback_data: `changeLang_${user_content.user_id}` }]
                                ]
                            }
                        });
                    }
                })
                break;
            case 'changeLang':
                //console.log(menu);
                app.bot.editMessageText(`🇪🇸 Selecciona el idioma\n🇺🇸 Select the language`, {
                    chat_id: menu.chat.id,
                    message_id: menu.message.message_id,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: `🇪🇸`, callback_data: `setNewLang_es_${menu.user.id}` }],
                            [{ text: `🇺🇸`, callback_data: `setNewLang_en_${menu.user.id}` }]
                        ]
                    }
                })

                break;
            case 'setNewLang':
                //console.log(menu)
                database.changeLanguage(menu.user, menu.data[1]).then((userUpdateLang) => {
                    if (userUpdateLang.code == true) {
                        //console.log(userUpdateLang)
                        var user = userUpdateLang.content;
                        app.i18n.setLocale(user.lang);

                        app.bot.editMessageText(app.i18n.__('predet_lang'), {
                            chat_id: menu.chat.id,
                            message_id: menu.message.message_id,
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: app.i18n.__('change_lang_button'), callback_data: `changeLang_${user.user_id}` }]
                                ]
                            }
                        })
                    }
                })
                break;
        }
    })
})


