const Discord = require("discord.js");
const exp = require("../data/exp.json");
const curr = require("../data/curr.json");


module.exports.run = async (bot, message, args) => {
    
    if (!exp[message.author.id]) {
        exp[message.author.id] = {
            exp: 0,
            lvl: 1
        };
    }

    if (!curr[message.author.id]) {
        curr[message.author.id] = {
            curr:   0
        };
    }

    let currUs = curr[message.author.id].curr;

    let curExp = exp[message.author.id].exp;
    let curLvl = exp[message.author.id].lvl;
    let nxtLvlExp = curLvl * 82;
    let diff = nxtLvlExp - curExp; 

    let statIcon = message.author.avatarURL
    let statEmb = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}'s Profile`, `${statIcon}`)
        .setColor("#f2873f")
        .addField("Level", curLvl, true)
        .addField("Exp", `${curExp}/${nxtLvlExp}`, true)
        .addField("Balance", `¥${currUs}`)
        .addBlankField()
        .setFooter(`${diff} exp till level up`)

    message.channel.send({embed:statEmb});
}