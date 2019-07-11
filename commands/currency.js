const Discord = require("discord.js");
const curr = require("../data/curr.json");
const fs = require("fs");

module.exports = {
    balanceCmd: async (bot, message, args) => {

        if (!curr[message.author.id]) {
            curr[message.author.id] = {
                curr:   0
            };
        }

        if (args[0] == message.author.toString() || !args[0]) {

            let currUser = curr[message.author.id].curr;

            let currUEmb = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setColor("#f2873f")
            .addField("Your Balance", `¥${currUser}`);

            message.channel.send({embed:currUEmb});

        return;
        }

        let balUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

        if (!balUser) {
            message.channel.send("Can't find user.")
            .then(message => {
                message.delete(4000)
            })
        return;
        }

        if (!curr[balUser.id]) {
            curr[balUser.id] = {
                curr: 0
            };
        }

        let currbUser = curr[balUser.id].curr;

        let currbEmb = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#f2873f")
        .addField("Their Balance", `${balUser}'s balance: ¥${currbUser}`)

        message.channel.send({embed:currbEmb});
    },


    giveCmd: async (bot, message, args) => {
        
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
    }
}