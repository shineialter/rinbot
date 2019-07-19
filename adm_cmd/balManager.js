const Discord = require("discord.js");
const Economy = require("../models/economys.js");
const fEconomy = require("../commands/utils/fEconomy.js");


module.exports.run = async (bot, message, args) => {

    if (message.author.id !== "235047791431385088" && message.author.id !== "191070377915449344") {

        let noAccIcon = bot.user.avatarURL
        let noAccEmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${noAccIcon}`)
        .setColor("#f2873f")
        .addField("Insufficient Permission", "Sorry, you don't have permission to do that.");

        message.channel.send({embed:noAccEmbed});
    }

    else {

        let getUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!getUser) {

            let noUserIcon = bot.user.avatarURL
            let noUserEmb = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}`, `${noUserIcon}`)
            .setColor("#f2873f")
            .addField("Error!", `User not found.`);

            message.channel.send({embed:noUserEmb});
        }

        else if (args[0] == message.author.toString()) {

            fEconomy.myself(Economy, message, (resulteco) => {
                if (!resulteco) {
                    const newEconomy = new Economy({
                        currId: message.author.id,
                        balance: 0
                    });
                    newEconomy.save().catch(err => console.log(err));
                } else {
                    
                    let balSet = args.slice(1).join(" ");

                    if (!balSet) { // kalo gada angka

                        let noAmtIcon = message.author.avatarURL
                        let noAmtEmb = new Discord.RichEmbed()
                        .setAuthor(`${message.author.username}`, `${noAmtIcon}`)
                        .setColor("#f2873f")
                        .addField("Error!", "You didn't type any amount!");

                        message.channel.send({embed:noAmtEmb});
                    }

                    else {

                        let AmtIcon = bot.user.avatarURL
                        let AmtEmb = new Discord.RichEmbed()
                        .setAuthor(`${bot.user.username}`, `${AmtIcon}`)
                        .setColor("#f2873f")
                        .addField("Balance Set!", `You have set your balance to **¥${balSet}**`);

                        message.channel.send({embed:AmtEmb});

                        resulteco.balance = balSet;
                        resulteco.save().catch(err => console.log(err));
                    }
                }    
            }); 
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
                    
                    let balSet = args.slice(1).join(" ");

                    if (!balSet) { // kalo gada angka

                        let noAmtIcon = bot.user.avatarURL
                        let noAmtEmb = new Discord.RichEmbed()
                        .setAuthor(`${bot.user.username}`, `${noAmtIcon}`)
                        .setColor("#f2873f")
                        .addField("Error!", "You didn't type any amount!");

                        message.channel.send({embed:noAmtEmb});
                    }

                    else {

                        let AmtOIcon = bot.user.avatarURL
                        let AmtOEmb = new Discord.RichEmbed()
                        .setAuthor(`${bot.user.username}`, `${AmtOIcon}`)
                        .setColor("#f2873f")
                        .addField("Balance Set!", `You have set ${getUser.toString()}'s balance to **¥${balSet}**`);

                        message.channel.send({embed:AmtOEmb});

                        let AdmOIcon = bot.user.avatarURL
                        let AdmEmb = new Discord.RichEmbed()
                        .setAuthor(`${bot.user.username}`, `${AdmOIcon}`)
                        .setColor("#f2873f")
                        .addField("Balance Changed!", `${getUser.user.username}, the administrator has set your balance to **¥${balSet}**!`);

                        getUser.send({embed:AdmEmb})

                        resulteco.balance = balSet;
                        resulteco.save().catch(err => console.log(err));
                    }     
                }
            })
        }
    }   
}