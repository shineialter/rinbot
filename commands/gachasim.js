const Discord = require("discord.js");
const Balance = require("../models/balances.js");
const fBalance = require("./utils/fBalance.js");
const Cooldown = require("../models/cooldowns.js");
const fCooldown = require("./utils/fCooldown.js");
const findIdol = require("./utils/findIdol.js");

// Script idea by Cronix#0363
// Script structured by Shinei#7000
// API by Starlight Kirara

module.exports.run = async (bot, message, args) => {

    var sec = 1000;
    var min = sec * 60;
    var botIcon = bot.user.avatarURL

    if (args[0] == "imas") {

        var amtGacha = args.slice(1).join(" ");
        var notNumber = isNaN(amtGacha)

        if (!amtGacha) {

            let noAmtEmb = new Discord.RichEmbed()
                .setAuthor(`${bot.user.username}`, `${botIcon}`)
                .setColor("#f2873f")
                .addField("Im@s Gacha Simulator", "You didn't write the amount of pulls you want!")
                .addField("Example", "?gachasim imas 5");

            message.channel.send({embed:noAmtEmb})
        }

        else if (notNumber) {

            let nanEmb = new Discord.RichEmbed()
                .setAuthor(`${bot.user.username}`, `${botIcon}`)
                .setColor("#f2873f")
                .addField("Im@s Gacha Simulator", "Please input a **number**!")

            message.channel.send({embed:nanEmb})
        }

        else if (amtGacha > 10) {

            let moreEmb = new Discord.RichEmbed()
                .setAuthor(`${bot.user.username}`, `${botIcon}`)
                .setColor("#f2873f")
                .addField("Im@s Gacha Simulator", "You cannot pull **more than 10** per gacha!")

            message.channel.send({embed:moreEmb})
        }

        else {
            fCooldown.gacha(Cooldown, message, (resultgacha) => {
                if (!resultgacha) {
                    const newCooldownUser = new Cooldown({
                        currId: message.author.id,
                        command: "gacha",
                        timenow: Date.now(),
                        cdtime: Date.now()
                    });
                    newCooldownUser.save().catch(err => console.log(err));
                }

                else if (resultgacha) {

                    resultgacha.timenow = Date.now()

                    if (resultgacha.timenow >= resultgacha.cdtime) {

                        fBalance.myself(Balance, message, (resultbal) => {
                            if (!resultbal) {
                                const newBalanceUser = new Balance({
                                    currId: message.author.id,
                                    balance: 0
                                });
                            newBalanceUser.save().catch(err => console.log(err));
                            }
    
                            else if (resultbal) {
    
                                var currentBal = resultbal.balance;
                                var price = 250 * amtGacha;
    
                                if (currentBal < price) {
    
                                    let noMoneyEmb = new Discord.RichEmbed()
                                    .setAuthor(`${bot.user.username}`, `${botIcon}`)
                                    .setColor("#f2873f")
                                    .addField("Im@s Gacha Simulator", `Sorry, you don't have enough money to pull **${amtGacha}** gacha.`)
    
                                    message.channel.send({embed:noMoneyEmb})
    
                                }
    
                                else {
                                    resultbal.balance = resultbal.balance - price;

                                    let startGachaEmb = new Discord.RichEmbed()
                                    .setAuthor(`${bot.user.username}`, `${botIcon}`)
                                    .setColor("#f2873f")
                                    .addField("Im@s Gacha Simulator", `**${message.author.toString()}, you just bought ${amtGacha} gacha. Good luck**!`);

                                    message.channel.send({embed:startGachaEmb})

                                    setTimeout(() => {
                                        message.author.send(`**You just pulled...**`);
                                    }, 2000)
                                    
                                    let interval = 10 * 300;
                                    let gachaTime = 3000 * amtGacha;
                                    
                                    setTimeout(() => {
                                        for (let i = 1; i <= amtGacha; i++) {
                                            setTimeout(i => {
                                                findIdol.find().then(result => {

                                                    const card_img = result.card_image_ref;

                                                    let getGachaEmb = new Discord.RichEmbed()
                                                        .setAuthor(`${result.chara.conventional}`, `${result.chara.icon_image_ref}`)
                                                        .setColor("#f2873f")
                                                        .addField("Im@s Gacha Simulator", `**${result.name}**`)
                                                        .setImage(card_img);
                                
                                                    message.author.send({embed:getGachaEmb});
                                
                                                    // SSR
                                                    if (result.rarity.rarity === 7) {
                                
                                                        let announceEmb = new Discord.RichEmbed()
                                                            .setAuthor(`${bot.user.username}`, `${botIcon}`)
                                                            .setColor("#f2873f")
                                                            .addField("Im@s Gacha Simulator", `${message.author.toString()} **just pulled a SSR**!!!`);
                                
                                                        message.channel.send({embed:announceEmb});
                                                    }
                                                });
                                            }, interval * i, i)
                                        }
                                    }, 4000)
                                
                                    setTimeout(() => {
                                        message.author.send("**Gacha completed!**");
                                    }, gachaTime + 6000)
                                    
                                    resultbal.save().catch(err => console.log(err));
                                }

                                resultgacha.cdtime = Date.now() + min;
                                resultgacha.save().catch(err => console.log(err));
                            }
                        })
                    }

                    else {

                        let t = Math.abs(resultgacha.cdtime - resultgacha.timenow) / 1000;
                        let s = Math.floor(t % 60);

                        let moreEmb = new Discord.RichEmbed()
                            .setAuthor(`${bot.user.username}`, `${botIcon}`)
                            .setColor("#f2873f")
                            .addField("Im@s Gacha Simulator", `**You can gacha again in ${s} seconds.**`);

                        message.channel.send({embed:moreEmb})
                    }
                }
            })
        }
    }

    else if (args[0] == "types") {

        let iGaEmmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Gacha Type", "**Im@s** (imas)", true)
        .addField("Cost", "**¥250**/1 gacha", true);

        message.channel.send({embed:iGaEmmbed})
    }

    else if (!args[0]) {
        return;
    }

    else {

        let noGachaEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Gacha Simulator", `That type of gacha does not exist!`);

        message.channel.send({embed:noGachaEmb})
        return;
    }
}
