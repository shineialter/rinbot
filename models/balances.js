const mongoose = require("mongoose");

const balanceSchema = mongoose.Schema({
    currId: String,
    balance: Number,
})

module.exports = mongoose.model("Balance", balanceSchema);