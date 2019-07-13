const Discord = require("discord.js");
const Balance = require("../models/balances.js");
const Exp = require("../models/exps.js");
const fBalance = require("./utils/fBalance.js");
const fExpLevel = require("./utils/fExpLevel.js");


module.exports.run = async (bot, message, args) => {
    
    let getUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))

    if (args[0] == message.author.toString() || !args[0]) {

        fBalance.myself(Balance, message, (result) => {
            if (!result) {
                const newBalance = new Balance({
                    currId: message.author.id,
                    guildId: message.guild.id,
                    balance: 0
                });
                const newExpLevel = new Exp({
                    currId: message.author.id,
                    guildId: message.guild.id,
                    exp: 0,
                    level: 1
                });
                newBalance.save().catch(err => console.log(err));
                newExpLevel.save().catch(err => console.log(err))
            } else {

            let nextLvl = result.level * 53;
            let diff = nextLvl - result.exp; 
            let userIcon = message.author.displayAvatarURL;
            let statIcon = bot.user.avatarURL;
            let statEmbed = new Discord.RichEmbed()
                .setAuthor(`${bot.user.username}`)
                .setThumbnail(userIcon)
                .setColor("#f2873f")
                .addField("Level", result.level, true)
                .addField("Exp", `${result.exp}/${nextLvl}`, true)
                .addField("Balance", `¥${result.balance}`)
                .addBlankField()
                .setFooter(`${diff} exp till level up`)

                message.channel.send({embed:statEmbed});
            }
        })     
    }
    else if (!getUser) {

        let notUserEmb = new Discord.RichEmbed()
        .setColor("#f2873f")
        .addField("Error!", `Can't find that user.`);

        message.delete(4000).catch(O_o=>{});
        message.channel.send({embed:notUserEmb}).then(message => {message.delete(4000)});
    }
}
    /*let balIcon = message.author.avatarURL
            let balEmbed = new Discord.RichEmbed()
                .setAuthor(`${message.author.username}`, `${balIcon}`)
                .setColor("#f2873f")
                .addField("Your Balance", `¥${result.balance}`);

                message.channel.send({embed:balEmbed});

    //

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

    message.channel.send({embed:statEmb});*/
