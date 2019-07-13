const fs = require("fs");

module.exports.find = (name, callback) => {
    let rawidol = fs.readFileSync(`./data/idolmaster/${name}/idol.json`, "utf8");
    let idolmaster = JSON.parse(rawidol);
    let random_idol = idolmaster[Math.floor(Math.random() * idolmaster.length)].ref;
    callback(random_idol)
}