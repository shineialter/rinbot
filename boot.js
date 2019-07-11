const config = require("./config.json");
const curr = require("./data/curr.json");
const infocmd = require("./commands/info.js");
const sinfocmd = require("./commands/serverinfo.js");
const repcmd = require("./commands/report.js");
const kcmd = require("./commands/kick.js");
const bcmd = require("./commands/ban.js");
const prcmd = require("./commands/prefix.js");
const currcmd = require("./commands/currency.js");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();


bot.on("ready", async () => {
    console.log(`Connected as ${bot.user.username} in developer mode!`);
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

    let prefixes = JSON.parse(fs.readFileSync("/rinbot/data/pref.JSON", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }

    if (!curr[message.author.id]) {
        curr[message.author.id] = {
            money: 0
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
});


//


bot.login(process.env.BOT_TOKEN);
