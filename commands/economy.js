const Discord = require("discord.js");
const Economy = require("../models/economys.js");
const fEconomy = require("./utils/fEconomy.js");

module.exports.run = async (bot, message, args) => {

    var userIcon = message.author.avatarURL
    var botIcon = bot.user.avatarURL

    let getUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (args[0] == message.author.toString() || !args[0]) {

        fEconomy.myself(Economy, message, (resulteco) => {
            if (!resulteco) {
                const newEconomy = new Economy({
                    currId: message.author.id,
                    balance: 0
                });
                newEconomy.save().catch(err => console.log(err));
            } else {

            let balEmbed = new Discord.RichEmbed()
                .setAuthor(`${message.author.username}`, `${userIcon}`)
                .setColor("#f2873f")
                .addField("Your Balance", `¥${resulteco.balance}`);

                message.channel.send({embed:balEmbed});
            }
        })
    } 
    
    else if (!getUser) {

        let notUserEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Error!", `Can't find that user.`);

        message.delete(4000).catch(O_o=>{});
        message.channel.send({embed:notUserEmb}).then(message => {message.delete(4000)});
    }

    else if (getUser) {
        fEconomy.otherUser(Economy, getUser, (resulteco) => {
            if (!resulteco) {
                const newTheirEconomy = new Economy({
                    currId: getUser.id,
                    balance: 0
                });
                newTheirEconomy.save().catch(err => console.log(err));
            } else {
                
            let balTheirIcon = getUser.user.avatarURL
            let balTheirEmbed = new Discord.RichEmbed()
                .setAuthor(`${getUser.user.username}`, `${balTheirIcon}`)
                .setColor("#f2873f")
                .addField(`${getUser.user.username}'s Balance`, `¥${resulteco.balance}`);

                message.channel.send({embed:balTheirEmbed});
            }
        })
    }
}





















    /* giveCmd: async (bot, message, args) => {
        
        if (!curr[message.author.id]) {
            message.reply("You don't have any money!")
        return;
        }

        let gU = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

        if (!args[0]) {
            return;
        }

        if (!gU) {
            message.channel.send("Can't find user.")
            .then(message => {
                message.delete(4000)
            })
        return;
        }

        if (args[0] == message.author.toString()) {
            message.channel.send("You can't pay yourself...")
            .then(message => {
                message.delete(4000)
            })
        return;
        }

        if (!curr[gU.id]) {
            curr[gU.id] = {
                curr: 0
            };
        }

        let currgAmt = args.slice(1).join(" ");        
        let gUcurr = curr[gU.id].curr;
        let bUcurr = curr[message.author.id].curr;

        if (!currgAmt) {
            message.channel.send("You didn't **input** any number to pay them!")
        return;
        }

        let letter = isNaN(currgAmt)

        if (letter) {
            message.channel.send("Please input only **numbers**!")
        return;
        }

        if (bUcurr < currgAmt) {
            message.channel.send("Sorry but you don't have that much money.");
        return;
        }

        if (bUcurr >= currgAmt) {            
            curr[message.author.id] = {
                curr: bUcurr - parseInt(args[1])
            };

            curr[gUcurr] = {
                curr: gUcurr + parseInt(args[1])
            };
            
            let sUEmbed = new Discord.RichEmbed()
            .setColor("#f2873f")
            .addField("Payment Issued", `**${message.author.username}**, you just paid ${gU} **¥${args[1]}**!`)

            message.channel.send({embed:sUEmbed});

            fs.writeFile("./data/curr.json", JSON.stringify(curr), (err) => {
                if(err) console.log(err)
            });
        }
    } */
