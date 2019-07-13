module.exports = {
    myself: (exp, message, callback) => {
        exp.findOne({
            currId: message.author.id,
            guildId: message.guild.id
        }, (err, result) => {
            if (err) throw err;
            if (!result) {
                callback(result);
            } else {
                callback(result)
            }
        })
    },

    otherUser: (exp, getUser, callback) => {
        exp.findOne({
            currId: getUser.id,
            guildId: getUser.guild.id
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