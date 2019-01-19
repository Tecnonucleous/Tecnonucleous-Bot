'use strict';

const config = require('./config')

// Token bot Telegram
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token_bot, {polling: true});

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

// API Pexels
const PexelsAPI = require('pexels-api-wrapper');
const Pexels = new PexelsAPI(config.token_pexels);
const Tesseract = require('tesseract.js')

// Modulos exportados
module.exports = {bot, db, imgur, weather, moment, Pexels, Tesseract}
