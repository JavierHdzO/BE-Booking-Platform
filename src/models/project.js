const { Schema, model } = require("mongoose");

const projectsSchemma = new Schema({
    partnerID:{
        type: Schema.Types.ObjectId,
        require: true
    },
    projectName: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: false,
    },
    status:{
        type: Boolean,
        default: true,
        require: false
    },
    image:{
        type: String,
        require: true
    }
});

module.exports = model('Project', projectsSchemma);
