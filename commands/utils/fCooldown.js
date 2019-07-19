module.exports = {
    test: (cooldown, message, callback) => {
        cooldown.findOne({
            currId: message.author.id,
            command: "test"
        }, (err, result) => {
            if (err) throw err;
            if (!result) {
                callback(result);
            } else {
                callback(result)
            }
        })
    },

    dailybal: (cooldown, message, callback) => {
        cooldown.findOne({
            currId: message.author.id,
            command: "dailybal"
        }, (err, resultdaily) => {
            if (err) throw err;
            if (!resultdaily) {
                callback(resultdaily);
            } else {
                callback(resultdaily)
            }
        })
    },

    gacha: (cooldown, message, callback) => {
        cooldown.findOne({
            currId: message.author.id,
            command: "gacha"
        }, (err, resultgacha) => {
            if (err) throw err;
            if (!resultgacha) {
                callback(resultgacha);
            } else {
                callback(resultgacha)
            }
        })
    },

    osuabandonq: (cooldown, message, callback) => {
        cooldown.findOne({
            currId: message.author.id,
            command: "osuquest abandon"
        }, (err, resultabandon) => {
            if (err) throw err;
            if (!resultabandon) {
                callback(resultabandon);
            } else {
                callback(resultabandon)
            }
        })
    },
}