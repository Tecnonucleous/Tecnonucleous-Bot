'use strict';

const app = require('../../settings/app');

app.bot.onText(/^\!check|^\/check/, (msg) => {

    var chat_id = msg.chat.id;

    app.bot.getMe(chat_id).then((me) => {

        app.bot.getChatMember(chat_id, me.id).then(function (user) {

            if (user.status == 'member') {
                app.bot.sendMessage(chat_id, "No soy admin");
            }
            if (user.status == 'administrator') {
                var bot_permissions = [user.can_be_edited, user.can_change_info, user.can_delete_messages, user.can_invite_users, user.can_restrict_members, user.can_pin_messages, user.can_promote_members];
                console.log(bot_permissions);

                for (var i = 0; i <= (bot_permissions.length - 1); i++) {
                    if (bot_permissions[i] == true) {
                        bot_permissions.splice(i, 1, "✅");
                    }
                    if (bot_permissions[i] == false) {
                        bot_permissions.splice(i, 1, "❌");
                    }
                }


                app.bot.sendMessage(chat_id, app.i18n.__('⚒ List of my permissions:\n\nI can edit messages: ') + bot_permissions[0] + app.i18n.__('\nI can change the group inforamtion: ') + bot_permissions[1] + app.i18n.__('\nI can delete messages: ') + bot_permissions[2] + app.i18n.__('\nI can add users: ') + bot_permissions[3] + app.i18n.__('\nI can restrict users: ') + bot_permissions[4] + app.i18n.__('\nI can pin messages: ') + bot_permissions[5] + app.i18n.__('\nI can add administrators: ') + bot_permissions[6]);
            }
        });
    });
});
