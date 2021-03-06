const mongoose = require("mongoose");

const osustdbmSchema = mongoose.Schema({
    approved: Number,
    sumbit_date: String,
    approved_date: String,
    last_update: String,
    artist: String,
    beatmap_id: {
        type: Number,
        require: true,
        unique: true,
    },
    beatmapset_id: Number,
    bpm: Number,
    creator: String,
    creator_id: Number,
    difficultyrating: Number,
    diff_aim: Number,
    diff_speed: Number,
    diff_size: Number,
    diff_overall: Number,
    diff_approach: Number,
    diff_drain: Number,
    hit_length: Number,
    source: String,
    genre_id: Number,
    language_id: Number,
    title: String,
    total_length: Number,
    version: String,
    file_md5: String,
    mode: Number,
    tags: String,
    favourite_count: Number,
    rating: Number,
    playcount: Number,
    passcount: Number,
    count_normal: Number,
    count_slider: Number,
    count_spinner: Number,
    max_combo: Number,
    download_unavailable: Number,
    audio_unavailable: Number
})

module.exports = mongoose.model("StandardBeatmaps", osustdbmSchema);