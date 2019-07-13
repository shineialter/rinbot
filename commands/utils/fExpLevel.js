module.exports = {
    myself: (exp, message, callback) => {
        exp.findOne({
            currId: message.author.id
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
