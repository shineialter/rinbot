const config = require("./config.json");

const Discord = require("discord.js");
const jimp = require("jimp")
const fs = require("fs");
const mongoose = require("mongoose");

const helpcmd = require("./commands/helpmee.js");
const infocmd = require("./commands/info.js");
const sinfocmd = require("./commands/serverinfo.js");
const repcmd = require("./commands/report.js");
const kcmd = require("./commands/kick.js");
const bcmd = require("./commands/ban.js");
const prcmd = require("./commands/prefix.js");
const currcmd = require("./commands/economy.js");
const daibal = require("./commands/dailybal.js");
const profcmd = require("./commands/profile.js");
const gchcmd = require("./commands/gachasim.js");
const osucmd = require("./commands/osu/osu.js");
const osusetcmd = require("./commands/osu/osuset.js");
const osustatscmd = require("./commands/osu/osustats.js");
const osuqcmd = require("./commands/osu/osuquest.js");
const osureccmd = require("./commands/osu/osurecent.js");

const admsetbal = require("./adm_cmd/balManager.js");
const admsetcd = require("./adm_cmd/cdManager.js");

const Economy = require("./models/economys.js")
const fEconomy = require("./commands/utils/fEconomy.js");

const bot = new Discord.Client();


// Connect to rin's database in mongodb
mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@rinbot-shard-00-00-6iqrw.mongodb.net:27017,rinbot-shard-00-01-6iqrw.mongodb.net:27017,rinbot-shard-00-02-6iqrw.mongodb.net:27017/test?ssl=true&replicaSet=rinbot-shard-0&authSource=admin&retryWrites=true&w=majority`, {
    useCreateIndex: true, useNewUrlParser: true})

mongoose.connection.on("open", () => {
    console.log("Connected to rinbot's mongoose database!")
}).on("error", err => {
    console.log(err)
})



// Bot by Shinei#7000
bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready and online!`);
    console.log(`Currently ${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity(`Studying JS || owo`, { type: `PLAYING` });
});

bot.on("guildMemberAdd", async member => {

    const newEconomy = new Economy({
        currId: member.user.id,
        balance: 0,
        exp: 0,
        level: 1
    })
})

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

        if (command === `help`) {
            helpcmd.run(bot, message, args);
        }

        if (command === `botinfo` || command === `binfo`) {
            infocmd.run(bot, message, args);
        }
    
        if (command === `serverinfo` || command === `sinfo`) {
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

        if (command === `balance` || command === `bal`) { // need fix
            currcmd.run(bot, message, args)
        }

        if (command === `dailybalance` || command === `dailybal` || command === `dbal`) {
            daibal.run(bot, message, args)
        }
    
        if (command === `pay`) { // need fix
            currcmd.run(bot, message, args)
        }
    
        if (command === `profile`) { // need fix
            profcmd.run(bot, message, args)
        }

        if (command === `gachasimulator` || command === `gachasim` || command === `gsim`) {
            gchcmd.run(bot, message, args)
        }

        // --- //

        if (command === `osu`) {
            osucmd.run(bot, message, args)
        }

        if (command === `osuset`) {
            osusetcmd.run(bot, message, args)
        }

        if (command === `osustats`) {
            osustatscmd.run(bot, message, args)
        }

        if (command === `osuquest`) {
            osuqcmd.run(bot, message, args)
        }

        if (command === `osurecent` || command === `recent` || command === `osur`) {
            osureccmd.run(bot, message, args)
        }
        
        // --- //

        if (command === `setbal`) {
            admsetbal.run(bot, message, args)
        }

        if (command === `resetcd`) {
            admsetcd.run(bot, message, args)
        }
    }

    else {
    
    // ooh you found something
    let rngGet = Math.floor(Math.random() * 20) + 1;
    let rngGetbal = Math.floor(Math.random() * 20) + 1;

    let expGet = Math.ceil(Math.random() * 10);

    if (rngGet === rngGetbal) {

        let balGet = Math.ceil(Math.random() * 50);

        console.log(message.author.username + " has found ¥" + balGet);

        fEconomy.myself(Economy, message, (resulteco) => {
            if (!resulteco) {
                const newEconomy = new Economy({
                    currId: message.author.id,
                    balance: balGet,
                    exp: 0,
                    level: 1
                })

                newEconomy.save().catch(err => console.log(err));
            }
            
            else {

                let curntExp = resulteco.exp;
                let curntLvl = resulteco.level;
                let nextLvl = resulteco.level * 53;

                resulteco.exp = curntExp + expGet;

                if (nextLvl <= resulteco.exp) {

                    resulteco.level = curntLvl + 1;

                    let prevLvl = resulteco.level - 1;
                    let resultecoetExp = prevLvl * 53;

                    let lvlUpIcon = message.author.avatarURL
                    let lvlUpEmb = new Discord.RichEmbed()
                        .setAuthor(`${message.author.username}`, `${lvlUpIcon}`)
                        .setColor("#f2873f")
                        .addField("Level Up!", `You are now level **${curntLvl + 1}**`);

                    message.channel.send({embed:lvlUpEmb})
                    resulteco.exp = curntExp - resultecoetExp
                    resulteco.save().catch(err => console.log(err));
                } 

                resulteco.balance = resulteco.balance + balGet;
                resulteco.save().catch(err => console.log(err));
                }
            })
        }
    }  
});


//

bot.login(process.env.BOT_TOKEN);