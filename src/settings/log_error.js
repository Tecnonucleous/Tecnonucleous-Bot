'use strict';

const app = require('./app');

app.bot.on('polling_error', function(error){
    console.log(error)
});