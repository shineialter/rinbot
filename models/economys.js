const mongoose = require("mongoose");

const economySchema = mongoose.Schema({
    currId: String,
    balance: Number,
    exp: Number,
    level: Number
})

module.exports = mongoose.model("Economy", economySchema);