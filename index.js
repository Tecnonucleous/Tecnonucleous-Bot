// Gestión del bot y base de datos
const config = require('./src/settings/config');
const app = require('./src/settings/app');
const error = require('./src/settings/log_error');

        // Evento bienvenida y "Primera vez" con el bot.
        const start = require('./src/commands/initial_commands/start');
        const welcome = require('./src/commands/initial_commands/welcome');

        // Comandos grupales
        const pin_unpin = require('./src/commands/groups/pin_unpin');
        const exportInviteLink = require('./src/commands/groups/exportInviteLink');
        const admin = require('./src/commands/groups/admin');
        const mod_unmod = require('./src/commands/groups/mod_unmod');

        // Comandos restrictivos
        const ban_unban = require('./src/commands/restrict/ban_unban');
        const mute_unmute = require('./src/commands/restrict/mute_unmute');
        const kick = require('./src/commands/restrict/kick');

        // Plugins
		if(config.token_imgur != ""){
        const imgur = require('./src/commands/plugins/imgur');
		}
        const weather = require('./src/commands/plugins/weather');
        const webshot = require('./src/commands/plugins/webshot');
        const qr = require('./src/commands/plugins/qr');
        const archiveorg = require('./src/commands/plugins/archiveorg');
        const progeso_ano = require('./src/commands/plugins/progreso_ano');
