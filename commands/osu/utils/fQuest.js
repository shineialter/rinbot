module.exports = {
    myself: (osu_quest, message, callback) => {
        osu_quest.findOne({
            currId: message.author.id,
        }, (err, res_quest) => {
            if (err) throw err;
            if (!res_quest) {
                callback(res_quest);
            } else {
                callback(res_quest)
            }
        })
    }
}