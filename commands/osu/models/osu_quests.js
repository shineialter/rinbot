const mongoose = require("mongoose");

const osu_questSchema = mongoose.Schema({
    currId: String,
    difficultychoice : String,
    fc: String,
    fullcombo: Boolean, //max_combo
    pass: Number, //total_length
    acc: Number, //accuracy
    mods: Number, //enabled_mods
    reward: Number,
    belowherearetoshowthequest: Number,
    artist: String,
    link: String,
    title: String,
    diffname: String,
    creator: String,
    fullcombo: String,
    modsnum: Number,
    mods: String,
    reward: Number,
    exp: Number,
    map_id: Number,
    mapset_id: Number,
    lengthnum: Number,
    length: String,
    bpm: Number,
    star: Number,
    max_combo: Number,
    CS: Number,
    AR: Number,
    OD: Number,
    HP: Number,
    status: String,
    favorite: Number
})

module.exports = mongoose.model("Osu_Quest", osu_questSchema);