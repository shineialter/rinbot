const mongoose = require("mongoose");

const expSchema = mongoose.Schema({
    currId: String,
    exp: Number,
    level: Number
})

module.exports = mongoose.model("Exp", expSchema);