module.exports = {
    myself: (economy, message, callback) => {
        economy.findOne({
            currId: message.author.id
        }, (err, resulteco) => {
            if (err) throw err;
            if (!resulteco) {
                callback(resulteco);
            } else {
                callback(resulteco)
            }
        })
    },

    otherUser: (economy, getUser, callback) => {
        economy.findOne({
            currId: getUser.id
        }, (err, resulteco) => {
            if (err) throw err;
            if (!resulteco) {
                callback(resulteco);
            } else {
                callback(resulteco)
            }
        })
    }
}