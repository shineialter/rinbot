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
        }, (err, result) => {
            if (err) throw err;
            if (!result) {
                callback(result);
            } else {
                callback(result)
            }
        })
    },

    gacha: (cooldown, message, callback) => {
        cooldown.findOne({
            currId: message.author.id,
            command: "gacha"
        }, (err, result) => {
            if (err) throw err;
            if (!result) {
                callback(result);
            } else {
                callback(result)
            }
        })
    },

    report: (cooldown, message, callback) => {
        cooldown.findOne({
            currId: message.author.id,
            command: "report"
        }, (err, result) => {
            if (err) throw err;
            if (!result) {
                callback(result);
            } else {
                callback(result)
            }
        })
    }
}