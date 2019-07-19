const Discord = require("discord.js");
const Cooldown = require("../models/cooldowns.js");
const fCooldown = require("../commands/utils/fCooldown.js");


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

        if (!args[0]) {
            return;
        }

        else if (args[0] == "dailybal") {

            let getUserArgs = args.slice(1).join(" ");
            let getUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(getUserArgs));
            
            if (!getUser) {

                let noUserIcon = bot.user.avatarURL
                let noUserEmb = new Discord.RichEmbed()
                .setAuthor(`${bot.user.username}`, `${noUserIcon}`)
                .setColor("#f2873f")
                .addField("Error!", `User not found.`);

                message.channel.send({embed:noUserEmb});
            }

            else if (getUser) {

                fCooldown.dailybal(Cooldown, message, (result) => {
                    if (!result) {

                        const newCooldownUser = new Cooldown({
                            currId: message.author.id,
                            command: "dailybal",
                            timenow: Date.now(),
                            cdtime: Date.now()
                        });
                        newCooldownUser.save().catch(err => console.log(err));
                    }

                    else {

                        let cdIcon = bot.user.avatarURL
                        let cdEmb = new Discord.RichEmbed()
                        .setAuthor(`${bot.user.username}`, `${cdIcon}`)
                        .setColor("#f2873f")
                        .addField("Cooldown Reset!", `You have reset ${getUser.toString()}'s **daily balance** cooldown!`);

                        message.channel.send({embed:cdEmb});

                        result.cdtime = Date.now()
                        result.save().catch(err => console.log(err));
                    }
                })
            }      
        }
    }   
}