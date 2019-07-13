const mongoose = require("mongoose");

const balanceSchema = mongoose.Schema({
    currId: String,
    guildId: String,
    balance: Number,
})

module.exports = mongoose.model("Balance", balanceSchema);