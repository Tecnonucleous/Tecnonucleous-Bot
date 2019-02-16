'use strict';

const config = require('./config')

// Token bot Telegram
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token_bot, {polling: true});

// Módulo para nodejs (https://www.npmjs.com/package/request) para realizar llamadas http, es compatible con HTTPS
// y sigue redirecciones de forma predeterminada
const request = require('request');

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

// Modulos exportados
module.exports = {bot, request, db, imgur, weather, moment}
