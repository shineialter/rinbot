const config = require("./config.json");
const curr = require("./data/curr.json");
const exp = require("./data/exp.json");
const infocmd = require("./commands/info.js");
const sinfocmd = require("./commands/serverinfo.js");
const repcmd = require("./commands/report.js");
const kcmd = require("./commands/kick.js");
const bcmd = require("./commands/ban.js");
const prcmd = require("./commands/prefix.js");
const currcmd = require("./commands/currency.js");
const stcmd = require("./commands/stats.js");
const Discord = require("discord.js");
const jimp = require("jimp")
const fs = require("fs");
const bot = new Discord.Client();


bot.on("ready", async () => {
    console.log(`${bot.user.username} is now online!`);
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity(`Studying JS || owo`, { type: `PLAYING` });
});


bot.on("message", async message => {

    if (message.author == bot.user) {
        return
    }

    if (message.channel.type === "dm") {
        return
    }

    let prefixes = JSON.parse(fs.readFileSync("./data/pref.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }

    if (!curr[message.author.id]) {
        curr[message.author.id] = {
            curr: 0
        };
    }

    let currAmt = Math.floor(Math.random() * 5) + 1;
    let baseAmt = Math.floor(Math.random() * 5) + 1;

    if (currAmt === baseAmt) {
        curr[message.author.id] = {
            curr: curr[message.author.id].curr + currAmt
        };

    fs.writeFile("./data/curr.json", JSON.stringify(curr), (err) => {
        if (err) console.log(err)
    });

    /* let currEmb = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#f2873f")
    .addField("Get Money", `¥${currAmt} added!`);

    message.channel.send({embed:currEmb}).then(message => {message.delete(5000)}); */

    }

    let expAdd = Math.floor(Math.random() * 7) + 8;

    if (!exp[message.author.id]) {
        exp[message.author.id] = {
            exp: 0,
            lvl: 1
        };
    }

    let curexp = exp[message.author.id].exp;
    let curLvl = exp[message.author.id].lvl;
    let nxtLvl = exp[message.author.id].lvl * 82;

    exp[message.author.id].exp = curexp + expAdd;

    if (nxtLvl <= exp[message.author.id].exp) {
        exp[message.author.id].lvl = curLvl + 1;

        let statsIcon = message.author.avatarURL
        let statsEmb = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`, `${statsIcon}`)
        .setColor("#f2873f")
        .addField(`Level Up!`, `You are now level ${curLvl + 1}`);

        message.channel.send({embed:statsEmb});
        console.log(`${message.author.username} leveled up to level ${exp[message.author.id].lvl}`);
    }

    fs.writeFile("./data/exp.json", JSON.stringify(exp), (err) => {
        if(err) console.log(err)
    });

    let prefix = prefixes[message.guild.id].prefixes;
    let msgArr = message.content.split(" ");
    let command = msgArr[0];
    let args = msgArr.slice(1);
    

    if (command === `${prefix}info`) {
        infocmd.run(bot, message, args);
    }

    if (command === `${prefix}serverinfo`) {
        sinfocmd.run(bot, message, args);
    }

    if (command === `${prefix}report`) {
        repcmd.run(bot, message, args);
    }

    if (command === `${prefix}kick`) {
        kcmd.run(bot, message, args);
    }

    if (command === `${prefix}ban`) {
        bcmd.run(bot, message, args)
    }

    if (command === `${prefix}prefix`) {
        prcmd.run(bot, message, args)
    }

    if (command === `${prefix}balance`) {
        currcmd.balanceCmd(bot, message, args)
    }

    if (command === `${prefix}pay`) {
        currcmd.giveCmd(bot, message, args)
    }

    if (command === `${prefix}stats`) {
        stcmd.run(bot, message, args)
    }
});


//


bot.login(process.env.BOT_TOKEN);
