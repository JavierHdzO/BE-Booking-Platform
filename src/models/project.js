const { Schema, model } = require("mongoose");

const projectsSchemma = new Schema({
    partnerID:{
        type: Schema.Types.ObjectId,
        required: true
    },
    projectName: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
    status:{
        type: Boolean,
        default: true,
        required: false
    },
    image:{
        type: String,
        required: true
    }
});

module.exports = model('Project', projectsSchemma);
