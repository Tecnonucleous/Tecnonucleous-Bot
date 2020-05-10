'use strict';

const config = require('./config')

// Token bot Telegram
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token_bot, { polling: true });

// Módulo para nodejs (https://www.npmjs.com/package/request-promise) para realizar llamadas http, es compatible con HTTPS
// y sigue redirecciones de forma predeterminada
const rp = require('request-promise')

//Base de datos
const Datastore = require('nedb'), db = new Datastore();

db.users = new Datastore('./src/database/users.db');
db.chats = new Datastore('./src/database/chats.db');

db.users.loadDatabase();
db.chats.loadDatabase();

// Client Imgur
const imgur = require('imgur');
imgur.setClientId(config.token_imgur)
imgur.getClientId();

// API Weather
const weather = require('weather-js');

// API Moment
const moment = require('moment');
moment.locale('es');

// Multilang Bot

const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'es'],
    defaultLocale: 'es', // Language settings
    register: global,
    updateFiles: false,
    directory: __dirname + '/locales'
});

// Modulos exportados
module.exports = { bot, rp, db, imgur, weather, moment, i18n }
