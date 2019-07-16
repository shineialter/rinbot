module.exports = {
    myself: (balance, message, callback) => {
        balance.findOne({
            currId: message.author.id
        }, (err, resultbal) => {
            if (err) throw err;
            if (!resultbal) {
                callback(resultbal);
            } else {
                callback(resultbal)
            }
        })
    },

    otherUser: (balance, getUser, callback) => {
        balance.findOne({
            currId: getUser.id
        }, (err, resultbalo) => {
            if (err) throw err;
            if (!resultbalo) {
                callback(resultbalo);
            } else {
                callback(resultbalo)
            }
        })
    }
}