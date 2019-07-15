const mongoose = require("mongoose");

const cooldownSchema = mongoose.Schema({
    currId: String,
    command: String,
    timenow: Number,
    cdtime: Number
})

module.exports = mongoose.model("Cooldown", cooldownSchema);