const findIdolFolder = require("./findIdolFolder.js");

module.exports.find = () => {

    let rngNumFive = (Math.random() * (100.000 - 0.001) + 0.001).toFixed(3);

    return new Promise((resolve, reject) => {

        if (rngNumFive <= 1.000) { // SSR  1%
            findIdolFolder.find("ssrare", idol => {
                resolve(idol);
            })
        } else if (rngNumFive >= 1.001 && rngNumFive <= 6.000) { // SR  5%
            findIdolFolder.find("srare", idol => {
                resolve(idol);
            })
        } else if (rngNumFive >= 6.001 && rngNumFive <= 30.000) { // R  25%
            findIdolFolder.find("rare", idol => {
                resolve(idol);
            })
        } else { // Common  75%
            findIdolFolder.find("common", idol => {
                resolve(idol);
            })
        }
    })

}