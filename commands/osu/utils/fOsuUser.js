module.exports = {
    myself: (osu_user, message, callback) => {
        osu_user.findOne({
            currId: message.author.id
        }, (err, res_user) => {
            if (err) throw err;
            if (!res_user) {
                callback(res_user);
            } else {
                callback(res_user)
            }
        })
    },

    otherUser: (osu_user, getUser, callback) => {
        osu_user.findOne({
            currId: getUser.id
        }, (err, res_othuser) => {
            if (err) throw err;
            if (!res_othuser) {
                callback(res_othuser);
            } else {
                callback(res_othuser)
            }
        })
    }
}