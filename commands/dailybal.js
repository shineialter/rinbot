const Discord = require("discord.js");
const Economy = require("../models/economys.js");
const fEconomy = require("./utils/fEconomy.js");
const fCooldown = require("./utils/fCooldown.js");
const Cooldown = require("../models/cooldowns.js");

var sec = 1000;
var min = sec * 60;
var hour = min * 60;
var day = hour * 24;


module.exports.run = async (bot, message, args) => {

    fCooldown.dailybal(Cooldown, message, (resultdaily) => {
        if (!resultdaily) {
            const newCooldownUser = new Cooldown({
                currId: message.author.id,
                command: "dailybal",
                timenow: Date.now(),
                cdtime: Date.now()
            });
            newCooldownUser.save().catch(err => console.log(err));
        } 
        
        else if (resultdaily) {

            resultdaily.timenow = Date.now()
                
                if (resultdaily.timenow >= resultdaily.cdtime) {

                    fEconomy.myself(Economy, message, (resulteco) => {
                        if (!resulteco) {
                            const newEconomy = new Economy({
                                currId: message.author.id,
                                balance: 0
                            });
                            newEconomy.save().catch(err => console.log(err));
                        } else {
                            
                            resulteco.balance = result.balance + 250;

                            let dBalIcon = message.author.avatarURL
                            let dBalEmb = new Discord.RichEmbed()
                            .setAuthor(`${message.author.username}`, `${dBalIcon}`)
                            .setColor("#f2873f")
                            .addField("Daily Balance", "You have received **¥250**!")
            
                            message.channel.send({embed:dBalEmb});
                            resulteco.save().catch(err => console.log(err));
                        }  
                    })

                    resultdaily.cdtime = Date.now() + day;
                    resultdaily.save().catch(err => console.log(err));

                } else {

                    let t = Math.abs(resultdaily.cdtime - resultdaily.timenow) / 1000;
                    let h = Math.floor(t / 3600) % 24;
                    let m = Math.floor(t / 60) % 60;
                    let s = Math.floor(t % 60);

                    let dBalUsIcon = bot.user.avatarURL
                    let dBalCd = new Discord.RichEmbed()
                        .setAuthor(`${bot.user.username}`, `${dBalUsIcon}`)
                        .setColor("#f2873f")
                        .addField("Daily Balance", `**${message.author.username}, your daily resets in ${h} hours ${m} minutes ${s} seconds.**`);

                    message.channel.send({embed:dBalCd})

                    resultdaily.save().catch(err => console.log(err));
                }
            } 
        })
    }
