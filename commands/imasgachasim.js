const Discord = require("discord.js");
const Balance = require("../models/balances.js");
const fBalance = require("./utils/fBalance.js");
const findIdol = require("./utils/findIdol.js");
const fetch = require('node-fetch-npm')
const gachaPrev = new Set();
const gachaCd = new Set();
const gachaOneCd = new Set();


module.exports.run = async (bot, message, args) => {

    if (args[0] == "5x") {

        fBalance.myself(Balance, message, (result) => {
            if (!result) {
                const newBalance = new Balance({
                    currId: message.author.id,
                    balance: 0
                });
                newBalance.save().catch(err => console.log(err));
            } 
            
            else {

                if (gachaPrev.has(message.author.id)) {

                    let gachaPrevEmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", `Gacha **in progress**!`);

                    message.channel.send({embed:gachaPrevEmb})
                    .then(message => {
                        message.delete(10000)
                    })
                } 
                
                else if (gachaCd.has(message.author.id)) {
                    message.channel.send(`${message.author.toString()} please wait **20 seconds** before you pull again!`)
                    .then(message => {
                        message.delete(20000)
                    })
                } 
                
                else {
                let curntBal = result.balance;

                if (curntBal < 1250) {

                    let noMoneyEmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", `Sorry **${message.author.username}**, you don't have enough money to pull 5x gacha.`);

                        message.delete(4000).catch(O_o=>{});
                        message.channel.send({embed:noMoneyEmb}).then(message => {message.delete(4000)});
                } 
                
                else if (curntBal >= 1250) {
                
                result.balance = curntBal - 1250;
                
                let startGachaEmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", `${message.author.toString()} please check your direct message for your pulls. **Good luck**!`);

                message.channel.send({embed:startGachaEmb})

                setTimeout(() => {
                message.author.send(`Here are your pulls, **${message.author.username}**.`);
                }, 2000)

                let interval = 10 * 300;

                setTimeout(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(i => {
                            findIdol.find().then(result => {
                                fetch(`https://starlight.kirara.ca${result}`)
                                    .then(res => res.json()).then(idol => {
                                        const { result } = idol;
                                        const img = result[0].card_image_ref
        
                                        //.////////////// EDIT EMBED MESSAGE HERE /////////////////////
                                        let getSSREmb = new Discord.RichEmbed()
                                            .setColor("#f2873f")
                                            .addField("GachaPon", `**${result[0].name}**`)
                                            .setImage(img)
                                            .setFooter(`Script helped by CronixYT`)
        
                                        message.author.send({ embed: getSSREmb });
        
                                        // SSR
                                        if (result[0].rarity.rarity === 7) {

                                            let announceEmb = new Discord.RichEmbed()
                                                .setColor("#f2873f")
                                                .addField("GachaPon", `${message.author.toString()} just pulled a **SSR**!!!`)
                                                .setFooter(`Script helped by CronixYT`)

                                            message.channel.send({embed:announceEmb});

                                        }
                                    }).catch(err => console.log(err))
                            });
                        }, interval * i, i)
                    }
                }, 4000)
                    

                    /*
                for(let i = 0 ; i <= 5 ; i++) {
                setTimeout(function (i) {
                    let rngNumTen = (Math.random() * (100.000 - 0.001) + 0.001).toFixed(3);
                    console.log(rngNumTen);

                    if (rngNumTen <= 1.000) {
                        console.log("You rolled a SSR!");

                        let getSSREmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", "Holy... you pulled a **Legendary**!!!")

                        message.channel.send(`${message.author.toString()} just pulled a **Legendary**!!!`);
                        message.author.send({embed:getSSREmb});
                    }
        
                    else if (rngNumTen >= 1.000 && rngNumTen <= 10.000) {
                        console.log("You rolled a SR!");

                        let getSREmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", "You rolled a **Super Rare**!")

                        message.author.send({embed:getSREmb});
                    } 
        
                    else if (rngNumTen >= 10.000 && rngNumTen <= 35.000) {
                        console.log("You rolled a R!");

                        let getREmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", "You rolled a **Rare**!")

                        message.author.send({embed:getREmb});
                    }
        
                    else {
                        console.log("You rolled a C!");

                        let getCEmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", "You rolled a **Common**!")

                        message.author.send({embed:getCEmb});
                        }
                    }, interval * i, i);
                }
            */
                

                setTimeout(() => {
                    message.author.send("I gave you one free pull for doing **5x gacha**! :D");
                }, 22000)

                result.save().catch(err => console.log(err));

                gachaPrev.add(message.author.id);
                setTimeout(() => {
                    gachaPrev.delete(message.author.id);
                }, 22000)

                gachaCd.add(message.author.id);
                setTimeout(() => {
                    gachaCd.delete(message.author.id);
                }, 42000)
                }
            }
            }    
        });
    }
    

    else if (args[0] == "1x") {

        fBalance.myself(Balance, message, (result) => {
            if (!result) {
                const newBalance = new Balance({
                    currId: message.author.id,
                    balance: 0
                });
                newBalance.save().catch(err => console.log(err));
            } 
            
            else {

                let curntBalOnce = result.balance;

                if (curntBalOnce < 250) {

                    let noMoneyOEmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", `Sorry **${message.author.username}**, you don't have enough money to pull a gacha.`);

                        message.delete(4000).catch(O_o=>{});
                        message.channel.send({embed:noMoneyOEmb}).then(message => {message.delete(4000)});
                } 
                
                else if (curntBalOnce >= 250) {
                
                result.balance = curntBalOnce - 250;

                let startGachaEmb = new Discord.RichEmbed()
                        .setColor("#f2873f")
                        .addField("GachaPon", `${message.author.toString()} please check your direct message for your pull. **Good luck**!`);

                message.channel.send({embed:startGachaEmb})

                setTimeout(() => {
                    message.author.send(`You have rolled....`);
                    }, 2000)
                
                setTimeout(() => {
                findIdol.find().then(result => {
                    fetch(`https://starlight.kirara.ca${result}`)
                        .then(res => res.json()).then(idol => {
                            const { result } = idol;
                            const img = result[0].card_image_ref

                            //.////////////// EDIT EMBED MESSAGE HERE /////////////////////
                            let getSSREmb = new Discord.RichEmbed()
                                .setColor("#f2873f")
                                .addField("GachaPon", `**${result[0].name}**`)
                                .setImage(img)
                                .setFooter(`Script helped by Cronix#0363`)

                            message.author.send({ embed: getSSREmb });

                            // SSR
                            if (result[0].rarity.rarity === 7) {

                                let announceEmb = new Discord.RichEmbed()
                                    .setColor("#f2873f")
                                    .addField(`${message.author.toString()} just pulled a **SSR**!!!`)
                                    .setFooter(`Script helped by Cronix#0363`)

                                message.channel.send({embed:announceEmb});

                            }
                        }).catch(err => console.log(err))
                });
            }, 5000)
                /*let rngNumOnce = (Math.random() * (100.000 - 0.001) + 0.001).toFixed(3);
                console.log(rngNumOnce);

                if (rngNumOnce <= 1.000) {
                    console.log("You rolled a SSR!");

                    let getSSREmb = new Discord.RichEmbed()
                    .setColor("#f2873f")
                    .addField("GachaPon", "Holy... you pulled a **Legendary**!!!")

                    message.channel.send(`${message.author.toString()} just pulled a **Legendary**!!!`);
                    message.author.send({embed:getSSREmb});
                }

                else if (rngNumOnce >= 1.000 && rngNumOnce <= 10.000) {
                    console.log("You rolled a SR!");

                    let getSREmb = new Discord.RichEmbed()
                    .setColor("#f2873f")
                    .addField("GachaPon", "You rolled a **Super Rare**!")

                    message.author.send({embed:getSREmb});
                } 

                else if (rngNumOnce >= 10.000 && rngNumOnce <= 35.000) {
                console.log("You rolled a R!");

                    let getREmb = new Discord.RichEmbed()
                    .setColor("#f2873f")
                    .addField("GachaPon", "You rolled a **Rare**!")

                    message.author.send({embed:getREmb});
                }

                else {
                    console.log("You rolled a C!");

                    let getCEmb = new Discord.RichEmbed()
                    .setColor("#f2873f")
                    .addField("GachaPon", "You rolled a **Common**!")

                    message.author.send({embed:getCEmb});
                }*/

                result.save().catch(err => console.log(err));
                }
            }
        });
    }

    else if (!args[0]) {

        let iGaIcon = message.author.avatarURL
        let iGaEmmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`, `${iGaIcon}`)
        .setColor("#f2873f")
        .addField("Im@s Gacha Simulator", "Correct usage:  ?imasgacha <amount>")
        .addField("Example", "?imasgacha 5x")
        .addField("Pulls", "1x\n5x", true)
        .addField("Cost", "¥250\n¥1250 + 1 free", true);

        message.channel.send({embed:iGaEmmbed})
    }
}
