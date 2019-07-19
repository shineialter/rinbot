const mongoose = require("mongoose");

const osu_userSchema = mongoose.Schema({
    currId: String,
    osu_username: String,
    quest_completed: Number
})

module.exports = mongoose.model("Osu_User", osu_userSchema);