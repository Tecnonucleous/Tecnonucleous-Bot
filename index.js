// Management of the bot -- Gestión del bot y base de datos
const config = require('./src/settings/config');
const app = require('./src/settings/app');
const error = require('./src/settings/log_error');

        // Welcome event and "First time" with the bot -- Evento bienvenida y "Primera vez" con el bot
        const start = require('./src/commands/initial_commands/start');
        const welcome = require('./src/commands/initial_commands/welcome');

        // Group commands -- Comandos grupales
        const pin_unpin = require('./src/commands/groups/pin_unpin');
        const exportInviteLink = require('./src/commands/groups/exportInviteLink');
        const admin = require('./src/commands/groups/admin');
        const mod_unmod = require('./src/commands/groups/mod_unmod');

        // Restrictive commands -- Comandos restrictivos
        const ban_unban = require('./src/commands/restrict/ban_unban');
        const mute_unmute = require('./src/commands/restrict/mute_unmute');
        const kick = require('./src/commands/restrict/kick');
        // Essentials -- Imprescindibles
        const getids = require('./src/commands/plugins/getids');
        // Testing
        const check = require('./src/commands/test/check');
        // Plugins
		    if(config.token_imgur != ""){
        const imgur = require('./src/commands/plugins/imgur');
		    }
        const weather = require('./src/commands/plugins/weather');
        const webshot = require('./src/commands/plugins/webshot');
        const qr = require('./src/commands/plugins/qr');
        const archiveorg = require('./src/commands/plugins/archiveorg');
        const progeso_ano = require('./src/commands/plugins/progreso_ano');
        const poll = require('./src/commands/plugins/poll');
        const savemsg = require('./src/commands/plugins/savemsg');
