const mongoose = require("mongoose");
const { stringify } = require("querystring");

const Schema = mongoose.Schema;

//Item Schema

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    lat: {
        type: Number,
        required: true
    },

    lng: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = Item = mongoose.model("item", ItemSchema);