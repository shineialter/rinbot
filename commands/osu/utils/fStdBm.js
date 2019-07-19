module.exports = {
    questeasy: (osu_beatmap, message, callback) => {
        osu_beatmap.find({
            approved: 1 || 4,
            difficultyrating: {
                $gte: 4, 
                $lte: 5
            }
        }, (err, res_map) => {
            if (err) throw err;
            if (!res_map) {
                callback(res_map);
            } else {
                callback(res_map)
            }
        })
    },

    questhard: (osu_beatmap, message, callback) => {
        osu_beatmap.find({
            approved: 1 || 4,
            difficultyrating: {
                $gte: 5.4,
                $lte: 6.5
            }
        }, (err, res_map) => {
            if (err) throw err;
            if (!res_map) {
                callback(res_map);
            } else {
                callback(res_map)
            }
        })
    }
}