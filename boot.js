const config = require("./config.json");
const infocmd = require("./commands/info.js");
const sinfocmd = require("./commands/serverinfo.js");
const repcmd = require("./commands/report.js");
const Discord = require("discord.js");
const bot = new Discord.Client();


bot.on("ready", async () => {
    console.log(`Connected as ${bot.user.username} in developer mode!`);
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity(`Studying JS owo || [?]`, { type: `PLAYING` });
});


bot.on("message", async message => {

    if (message.author == bot.user) {
        return
    }

    if (message.channel.type === "dm") {
        return
    }

    let prefix = config.prefix;
    let msgArr = message.content.split(" ");
    let command = msgArr[0];
    let args = msgArr.slice(1);
    

    if (command === `${prefix}info`) {
        infocmd.run(bot, message, args);
    }

    if (command === `${prefix}serverinfo`) {
        sinfocmd.run(bot, message, args);
    }

    if (command ===`${prefix}report`) {
        repcmd.run(bot, message, args);
    }
});


//


bot.login(process.env.BOT_TOKEN);
