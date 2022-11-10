const { Schema, model } = require('mongoose');


const developmentSchema = new Schema({

});

module.exports = model('Development', developmentSchema);