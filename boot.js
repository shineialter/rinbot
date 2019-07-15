const config = require("./config.json");

const infocmd = require("./commands/info.js");
const sinfocmd = require("./commands/serverinfo.js");
const repcmd = require("./commands/report.js");
const kcmd = require("./commands/kick.js");
const bcmd = require("./commands/ban.js");
const prcmd = require("./commands/prefix.js");
const currcmd = require("./commands/currency.js");
const daibal = require("./commands/dailybal.js");
const stcmd = require("./commands/stats.js");
const imasgchcmd = require("./commands/imasgachasim.js");

const test = require("./testing.js");

const admsetbal = require("./adm_cmd/balManager.js");
const admsetcd = require("./adm_cmd/cdManager.js");

const Discord = require("discord.js");
const jimp = require("jimp")
const fs = require("fs");
const mongoose = require("mongoose");

const bot = new Discord.Client();

// Bot by Shinei#7000

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@rinbot-shard-00-00-6iqrw.mongodb.net:27017,rinbot-shard-00-01-6iqrw.mongodb.net:27017,rinbot-shard-00-02-6iqrw.mongodb.net:27017/test?ssl=true&replicaSet=rinbot-shard-0&authSource=admin&retryWrites=true&w=majority`, {
    useCreateIndex: true, useNewUrlParser: true})

mongoose.connection.on("open", () => {
    console.log("Connected to rinbot's mongoose database!")
}).on("error", err => {
    console.log(err)
})


const Balance = require("./models/balances.js")
const Exp = require("./models/exps.js");


bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready and online!`);
    console.log(`Currently ${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity(`Studying JS || owo`, { type: `PLAYING` });
});


bot.on("message", async message => {
    //let prefixes = JSON.parse(fs.readFileSync("./data/pref.json", "utf8"));

    //if (!prefixes[message.guild.id]) {
    //    prefixes[message.guild.id] = {
    //        prefixes: config.prefix
    //    };
   // }

    let prefix = config.prefix;
    let args = message.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();

    if (message.author == bot.user || message.author.bot) {
        return;
    } 
    
    else if (message.channel.type === "dm") {
        return
    }

    else if (message.content.startsWith(prefix)) {

        if (command === `info`) {
            infocmd.run(bot, message, args);
        }
    
        if (command === `serverinfo`) {
            sinfocmd.run(bot, message, args);
        }
    
        if (command === `report`) { 
            repcmd.run(bot, message, args);
        }
    
        if (command === `kick`) { 
            kcmd.run(bot, message, args);
        }
    
        if (command === `ban`) { 
            bcmd.run(bot, message, args)
        }
    
        if (command === `prefix`) { //need fix
            prcmd.run(bot, message, args)
        }

        // --- //

        if (command === `balance`) { // need fix
            currcmd.run(bot, message, args)
        }

        if (command === `dailybal`) {
            daibal.run(bot, message, args)
        }
    
        if (command === `pay`) { // need fix
            currcmd.run(bot, message, args)
        }
    
        if (command === `stats`) { // need fix
            stcmd.run(bot, message, args)
        }

        if (command === `gachasim`) {
            imasgchcmd.run(bot, message, args)
        }
        
        // --- //

        if (command === `setbal`) {
            admsetbal.run(bot, message, args)
        }

        if (command === `resetcd`) {
            admsetcd.run(bot, message, args)
        }

        // --- //

        if (command === `test`) {
            test.run(bot, message, args)
        }
    }

    else {
    
    // ooh you found something
    let rngGet = Math.floor(Math.random() * 10) + 1;
    let rngGetbal = Math.floor(Math.random() * 10) + 1;

    if (rngGet === rngGetbal) {

        let balGet = Math.ceil(Math.random() * 50);

        console.log(message.author.username + " has found ¥" + balGet);

        Balance.findOne({
            currId: message.author.id
        }, (err, res) => {

            if (err) throw err;
            if (!res) {

                const newBalance = new Balance({
                    currId: message.author.id,
                    balance: balGet
                })
            
                newBalance.save().catch(err => console.log(err));
            } else {
                res.balance = res.balance + balGet;
                res.save().catch(err => console.log(err));
            }
        })
    }

    // lebel appu da
    let expGet = Math.ceil(Math.random() * 17);

    Exp.findOne({
        currId: message.author.id
    }, (err, res) => {
        if (err) throw err;
        if (!res) {

            const newExpStats = new Exp({
                currId: message.author.id,
                exp: expGet,
                level: 1
            })

            newExpStats.save().catch(err => console.log(err));
        } else {
            let curntExp = res.exp;
            let curntLvl = res.level;
            let nextLvl = res.level * 53;

            res.exp = curntExp + expGet;

                if (nextLvl <= res.exp) {

                    res.level = curntLvl + 1;

                    let prevLvl = res.level - 1;
                    let resetExp = prevLvl * 53;

                    let lvlUpIcon = message.author.avatarURL
                    let lvlUpEmb = new Discord.RichEmbed()
                        .setAuthor(`${message.author.username}`, `${lvlUpIcon}`)
                        .setColor("#f2873f")
                        .addField("Level Up!", `You are now level **${curntLvl + 1}**`);

                    message.channel.send({embed:lvlUpEmb})
                    res.exp = curntExp - resetExp
                    res.save().catch(err => console.log(err));
                } else {
                    console.log("Your exp is " + res.exp)
                    res.save().catch(err => console.log(err));
                }
            }
        })
    }  
});


//


bot.login(process.env.BOT_TOKEN);
