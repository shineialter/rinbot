module.exports = {
    myself: (balance, message, callback) => {
        balance.findOne({
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

    otherUser: (balance, getUser, callback) => {
        balance.findOne({
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