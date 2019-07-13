const findIdolFolder = require("./findIdolFolder.js");

module.exports.find = () => {

    let rngNumFive = (Math.random() * (100.000 - 0.001) + 0.001).toFixed(3);

    return new Promise((resolve, reject) => {

        if (rngNumFive <= 1.000) { // SSR
            findIdolFolder.find("ssrare", idol => {
                resolve(idol);
            })
        } else if (rngNumFive >= 1.000 && rngNumFive <= 10.000) { // SR
            findIdolFolder.find("srare", idol => {
                resolve(idol);
            })
        } else if (rngNumFive >= 10.000 && rngNumFive <= 35.000) { // R
            findIdolFolder.find("rare", idol => {
                resolve(idol);
            })
        } else { // Common
            findIdolFolder.find("common", idol => {
                resolve(idol);
            })
        }
    })

}