const Discord = require("discord.js");
const nodeosu = require("node-osu");
const Economy = require("../../models/economys.js");
const fEconomy = require("../utils/fEconomy.js")
const Osu_User = require("./models/osu_users.js");
const fOsuUser = require("./utils/fOsuUser.js");
const fQuest = require("./utils/fQuest.js");
const Osu_Quest = require("./models/osu_quests.js");
const Osu_Standard_Beatmaps = require("./models/osu_standard_beatmaps.js");
const fStdBm = require("./utils/fStdBm.js");
const fCooldown = require("../utils/fCooldown.js");

module.exports.run = async (bot, message, args) => {

    var osu = new nodeosu.Api('fe0518f75e945e284ecda7eda48ba2f7bf64789a', {
        notFoundAsError: true,
        completeScores: false
    });

    var sec = 1000;
    var min = sec * 60;
    var osuIcon = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Osu%21Logo_%282015%29.svg/330px-Osu%21Logo_%282015%29.svg.png`

    if (args[0]) {

        fOsuUser.myself(Osu_User, message, async (res_user) => {

            if (!res_user) {

                let noUserEmb = new Discord.RichEmbed()
                .setAuthor(`No username linked to your discord account!`, `${osuIcon}`)
                .setDescription(`⬞⬞▹ Use  **?osuset user <username>**  to start playing quests.`)
                .setColor("#f2873f");

                message.channel.send({embed:noUserEmb})
            }

            else {

                let diffChoice = args[0]
                let playerName = res_user.osu_username;
                //let playerBest = await osu.getUserBest({u: playerName})

                if (diffChoice === `easy`) {

                    fQuest.myself(Osu_Quest, message, async (res_quest) => {

                        if (res_quest) {

                            let haveQEmb = new Discord.RichEmbed()
                                .setAuthor(`You already have a quest ongoing!`, `${osuIcon}`)
                                .setColor("#f2873f");

                            message.channel.send({embed:haveQEmb})
                        }

                        else if (!res_quest) {

                            fStdBm.questeasy(Osu_Standard_Beatmaps, message, async (res_map) => {
                                if(!res_map) {
       
                                    console.log("no maps atm");
                                }
       
                                else if (res_map) {
       
                                    let chosenMap = res_map[Math.floor(Math.random() * res_map.length)];

                                    let fullcombo = ""
                                    let qfc = ""
                                    let qpass = ""
                                    let mods = ""
                                    let mapstatus = ""
                                    let mapgamemode = ""
                                    let mapapproveid = chosenMap.approved;
                                    let mapartist = chosenMap.artist;
                                    let map_id = chosenMap.beatmap_id;
                                    let mapset_id = chosenMap.beatmapset_id;
                                    let mapbpm = chosenMap.bpm;
                                    let mapcreator = chosenMap.creator;
                                    let mapmode = chosenMap.mode;
                                    let mapstar = chosenMap.difficultyrating;
                                    let mapCS = chosenMap.diff_size;
                                    let mapOD = chosenMap.diff_overall;
                                    let mapAR = chosenMap.diff_approach;
                                    let mapHP = chosenMap.diff_drain;
                                    let maplength = chosenMap.total_length;
                                    let maptitle = chosenMap.title;
                                    let mapdiffname = chosenMap.version;
                                    let mapfavorite = chosenMap.favourite_count;
                                    let mapmax_combo = chosenMap.max_combo;

                                    //FC or not?
                                    let fcnum = [0, 0, 0, 1, 1, 1];
                                    var fullcombostr = fcnum[Math.floor(Math.random() * fcnum.length)];

                                    //With mods?
                                    let modsnum = [0, 0, 0, 0, 0, 8, 8, 16];
                                    var modsstr = modsnum[Math.floor(Math.random() * modsnum.length)];

                                    let minute = Math.floor(maplength / 60);
                                    let seconds = maplength % 60; 
                                    
                                    if (seconds < 10) {
                                        var fixedseconds = `0${seconds}`;
                                    } else {
                                        fixedseconds = seconds;
                                    }

                                    let length = `${minute}:${fixedseconds}`

                                    //reward
                                    let qreward = Math.ceil(Math.random() * 50) + 60;

                                    //exp
                                    let qexp = Math.ceil(Math.random() * 50) + 20;

                                    if (mapapproveid === 1) {
                                        mapstatus = "Ranked";

                                    } else if (mapapproveid === 4) {
                                        mapstatus = "Loved";
                                    }

                                    if (mapmode === 0) {
                                        mapgamemode = "osu";
                                    }

                                    if (fullcombostr === 1) {
                                        qfc = "Full combo"
                                        fullcombo = true;
                                        qpass = 0;
                                        qexp = qexp + 40;
                                        qreward = qreward + 75;

                                    } else if (fullcombostr === 0) {
                                        qfc = "Pass"
                                        fullcombo = false;
                                        qpass = maplength;
                                    }

                                    if (modsstr === 0) {
                                        mods = "**no mod**";

                                    } else if (modsstr === 8) {
                                        mods = "with **HD**";
                                        qexp = qexp + 15;
                                        qreward = qreward + 43;

                                    } else if (modsstr === 16) {
                                        mods = "with **HR**";
                                        qexp = qexp + 50;
                                        qreward = qreward + 86;
                                    }

                                    let maplink = `https://osu.ppy.sh/beatmapsets/${mapset_id}#${mapgamemode}/${map_id}`

                                    let QuestEmb = new Discord.RichEmbed()
                                        .setAuthor(`${mapartist} - ${maptitle} [${mapdiffname}] by ${mapcreator}`, `${osuIcon}`, maplink)
                                        .setColor("#f2873f")
                                        .setDescription(`\n**Quest** ▹ **${qfc}** this map ${mods}!\n**Reward** ▹ **¥${qreward}** + **${qexp}xp**\n\n**Download:** [map](https://osu.ppy.sh./d/${map_id}) ⬞ [no video](https://osu.ppy.sh./d/${map_id}n) ⬞ [direct](https://bloodcat.com/osu/s/${map_id})\n`)
                                        .setThumbnail(`https://b.ppy.sh/thumb/${mapset_id}l.jpg`)
                                        .addField(`Map Details`, `**Length:** ${length} ⬞ **BPM:** ${mapbpm}\n**Stars:** ☆${Number(mapstar).toFixed(2)} ⬞ **Max Combo:** x${mapmax_combo}\n\n**CS:** ${mapCS} ⬞ **AR:** ${mapAR} ⬞ **OD:** ${mapOD} ⬞ **HP:** ${mapHP}`)
                                        .setFooter(`▹ ${mapstatus} ▹ ♥ ${mapfavorite} ▹ Quest for ${message.author.username}`);

                                    message.channel.send({embed:QuestEmb});

                                    const newQuest = new Osu_Quest({
                                        currId: message.author.id,
                                        difficultychoice: diffChoice,
                                        fc: qfc,
                                        fullcombo: fullcombo,
                                        pass: qpass,
                                        acc: 0,
                                        mods: modsstr,
                                        reward: qreward,
                                        exp: qexp,
                                        belowherearetoshowthequest: 0,
                                        artist: mapartist,
                                        link: maplink,
                                        title: maptitle,
                                        diffname: mapdiffname,
                                        creator: mapcreator,
                                        fullcombo: fullcombo,
                                        modsnum: modsstr,
                                        mods: mods,
                                        reward: qreward,
                                        map_id: map_id,
                                        mapset_id: mapset_id,
                                        lengthnum: maplength,
                                        length: length,
                                        bpm: mapbpm,
                                        star: mapstar,
                                        max_combo: mapmax_combo,
                                        CS: mapCS,
                                        AR: mapAR,
                                        OD: mapOD,
                                        HP: mapHP,
                                        status: mapstatus,
                                        favorite: mapfavorite
                                    })

                                    newQuest.save().catch(err => console.log(err));
                                }
                           })
                        }
                    })      
                }

                else if (diffChoice === `hard`) {

                    fQuest.myself(Osu_Quest, message, async (res_quest) => {

                        if (res_quest) {

                            let haveQEmb = new Discord.RichEmbed()
                                .setAuthor(`You already have a quest ongoing!`, `${osuIcon}`)
                                .setColor("#f2873f");

                            message.channel.send({embed:haveQEmb})
                        }

                        else if (!res_quest) {

                            fStdBm.questhard(Osu_Standard_Beatmaps, message, async (res_map) => {
                                if(!res_map) {
       
                                    console.log("no maps atm");
                                }
       
                                else if (res_map) {
       
                                    let chosenMap = res_map[Math.floor(Math.random() * res_map.length)];

                                    let fullcombo = ""
                                    let qfc = ""
                                    let qpass = ""
                                    let mods = ""
                                    let mapstatus = ""
                                    let mapgamemode = ""
                                    let mapapproveid = chosenMap.approved;
                                    let mapartist = chosenMap.artist;
                                    let map_id = chosenMap.beatmap_id;
                                    let mapset_id = chosenMap.beatmapset_id;
                                    let mapbpm = chosenMap.bpm;
                                    let mapcreator = chosenMap.creator;
                                    let mapmode = chosenMap.mode;
                                    let mapstar = chosenMap.difficultyrating;
                                    let mapCS = chosenMap.diff_size;
                                    let mapOD = chosenMap.diff_overall;
                                    let mapAR = chosenMap.diff_approach;
                                    let mapHP = chosenMap.diff_drain;
                                    let maplength = chosenMap.total_length;
                                    let maptitle = chosenMap.title;
                                    let mapdiffname = chosenMap.version;
                                    let mapfavorite = chosenMap.favourite_count;
                                    let mapmax_combo = chosenMap.max_combo;

                                    //FC or not?
                                    let fcnum = [0, 0, 0, 0, 0, 0, 0, 1, 1];
                                    var fullcombostr = fcnum[Math.floor(Math.random() * fcnum.length)];

                                    //With mods?
                                    let modsnum = [0, 0, 0, 0, 0, 8, 8, 16];
                                    var modsstr = modsnum[Math.floor(Math.random() * modsnum.length)];

                                    let minute = Math.floor(maplength / 60);
                                    let seconds = maplength % 60; 
                                    
                                    if (seconds < 10) {
                                        var fixedseconds = `0${seconds}`;
                                    } else {
                                        fixedseconds = seconds;
                                    }

                                    let length = `${minute}:${fixedseconds}`

                                    //reward
                                    let qreward = Math.ceil(Math.random() * 50) +250;

                                    //exp
                                    let qexp = Math.ceil(Math.random() * 30) + 110;

                                    if (mapapproveid === 1) {
                                        mapstatus = "Ranked";

                                    } else if (mapapproveid === 4) {
                                        mapstatus = "Loved";
                                    }

                                    if (mapmode === 0) {
                                        mapgamemode = "osu";
                                    }

                                    if (fullcombostr === 1) {
                                        fullcombo = true;
                                        qfc = "Full combo"
                                        qpass = 0;
                                        qexp = qexp + 90;
                                        qreward = qreward + 140;

                                    } else if (fullcombostr === 0) {
                                        fullcombo = false;
                                        qfc = "Pass"
                                        qpass = maplength;
                                    }

                                    if (modsstr === 0) {
                                        mods = "**no mod**";

                                    } else if (modsstr === 8) {
                                        mods = "with **HD**";
                                        qexp = qexp + 30;
                                        qreward = qreward + 70;

                                    } else if (modsstr === 16) {
                                        mods = "with **HR**"
                                        qexp = qexp + 60;
                                        qreward = qreward + 120;
                                    }

                                    let maplink = `https://osu.ppy.sh/beatmapsets/${mapset_id}#${mapgamemode}/${map_id}`

                                    let QuestEmb = new Discord.RichEmbed()
                                        .setAuthor(`${mapartist} - ${maptitle} [${mapdiffname}] by ${mapcreator}`, `${osuIcon}`, maplink)
                                        .setColor("#f2873f")
                                        .setDescription(`\n**Quest** ▹ **${qfc}** this map ${mods}!\n**Reward** ▹ **¥${qreward}** + **${qexp}xp**\n\n**Download:** [map](https://osu.ppy.sh./d/${map_id}) ⬞ [no video](https://osu.ppy.sh./d/${map_id}n) ⬞ [direct](https://bloodcat.com/osu/s/${map_id})\n`)
                                        .setThumbnail(`https://b.ppy.sh/thumb/${mapset_id}l.jpg`)
                                        .addField(`Map Details`, `**Length:** ${length} ⬞ **BPM:** ${mapbpm}\n**Stars:** ☆${Number(mapstar).toFixed(2)} ⬞ **Max Combo:** x${mapmax_combo}\n\n**CS:** ${mapCS} ⬞ **AR:** ${mapAR} ⬞ **OD:** ${mapOD} ⬞ **HP:** ${mapHP}`)
                                        .setFooter(`▹ ${mapstatus} ▹ ♥ ${mapfavorite} ▹ Quest for ${message.author.username}`);

                                    message.channel.send({embed:QuestEmb});

                                    const newQuest = new Osu_Quest({
                                        currId: message.author.id,
                                        difficultychoice: diffChoice,
                                        fc: qfc,
                                        fullcombo: fullcombo,
                                        pass: qpass,
                                        acc: 0,
                                        mods: modsstr,
                                        reward: qreward,
                                        exp: qexp,
                                        belowherearetoshowthequest: 0,
                                        artist: mapartist,
                                        link: maplink,
                                        title: maptitle,
                                        diffname: mapdiffname,
                                        creator: mapcreator,
                                        fullcombo: fullcombo,
                                        modsnum: modsstr,
                                        mods: mods,
                                        reward: qreward,
                                        map_id: map_id,
                                        mapset_id: mapset_id,
                                        lengthnum: maplength,
                                        length: length,
                                        bpm: mapbpm,
                                        star: mapstar,
                                        max_combo: mapmax_combo,
                                        CS: mapCS,
                                        AR: mapAR,
                                        OD: mapOD,
                                        HP: mapHP,
                                        status: mapstatus,
                                        favorite: mapfavorite
                                    })

                                    newQuest.save().catch(err => console.log(err));
                                }
                           })

                            newQuest.save().catch(err => console.log(err));
                        }
                    })
                }


                //
                else if (diffChoice === `turnin` || diffChoice === `ti`) {

                    fQuest.myself(Osu_Quest, message, async (res_quest) => {

                        if (!res_quest) {
    
                            let haveQEmb = new Discord.RichEmbed()
                                .setAuthor(`You don't have any quest to turn in!`, `${osuIcon}`)
                                .setDescription(`⬞⬞▹ Use  **?osuquest <difficulty>**  to get one.`)
                                .setColor("#f2873f");
    
                            message.channel.send({embed:haveQEmb})
                        }
    
                        else if (res_quest) {
                                
                            fQuest.myself(Osu_Quest, message, async (res_quest) => {

                                if (res_quest) {
                                    
                                    let diff = ""
                                    let questdiff = res_quest.difficultychoice;
                                    let questMap_id = res_quest.map_id;
                                    let questFC = res_quest.fullcombo;
                                    //let questFCd= res_quest.fc;
                                    //let questpass = res_quest.lengthnum;
                                    let questmods = res_quest.modsnum;
                                    let questreward = res_quest.reward;
                                    let questexp = res_quest.exp;
                                    //let no_fail = 1;
                                    //let questpass = res_quest.max_combo

                                    if (questdiff === `easy`) {

                                        diff = "an easy"
                                    } 

                                    else {

                                        diff = "a hard"
                                    }
                                    
                                    let checkPlayerRec = await osu.getUserRecent({u: playerName, limit: 15})
                                    
                                    if (checkPlayerRec.length < 1) {

                                        let noPlaysEmb = new Discord.RichEmbed()
                                            .setAuthor(`No 24h recent plays found in your profile!`, `${osuIcon}`)
                                            .setColor("#f2873f");

                                        message.channel.send({embed:noPlaysEmb})
                                    }

                                    else if (checkPlayerRec.length > 0) {
                                        
                                        var { theMap } = {};

                                        for (let i = 0; i < checkPlayerRec.length; i++) {

                                            console.log(checkPlayerRec[i].perfect, questFC)
                                            if (checkPlayerRec[i].beatmapId == questMap_id && checkPlayerRec[i].raw_mods == questmods && `${checkPlayerRec[i].perfect}` == questFC && checkPlayerRec[i].rank !== "F") {

                                                theMap = checkPlayerRec[i];
                                                console.log("yes") // soo this exist if one of ur plays match the criteria.
                                            }
                                        }
                                        console.log(theMap)
                                        if (!theMap) { // this if the script didn't found any play that fullfil the critera

                                            let noPlaysEmb = new Discord.RichEmbed()
                                                .setAuthor(`You didn't fulfill the quest criteria.`, `${osuIcon}`)
                                                .setColor("#f2873f");

                                             message.channel.send({embed:noPlaysEmb})

                                            }

                                            else if (theMap) {

                                                fEconomy.myself(Economy, message, (resulteco) => {
                                                if (!resulteco) {
                                                    const newEconomy = new Economy({
                                                        currId: message.author.id,
                                                        balance: questreward,
                                                        exp: questexp,
                                                        level: 0
                                                    })

                                                    resulteco.balance = resulteco.balance + questreward;
                                                    resulteco.exp = resulteco.exp + questexp;
                                                    
                                                    let QclearEmb = new Discord.RichEmbed()
                                                        .setAuthor(`You have completed ${diff} quest!`, `${osuIcon}`)
                                                        .setDescription(`**Quest Reward**\n\n + ¥${questreward}\n + ${questexp}exp`)
                                                        .setColor("#f2873f");

                                                    message.channel.send({embed:QclearEmb})

                                                    newEconomy.save().catch(err => console.log(err));
                                                }

                                                else {

                                                    resulteco.balance = resulteco.balance + questreward;
                                                    resulteco.exp = resulteco.exp + questexp;
                                                    
                                                    let QclearEmb = new Discord.RichEmbed()
                                                        .setAuthor(`You have completed ${diff} quest!`, `${osuIcon}`)
                                                        .setDescription(`**Quest Reward**\n\n + ¥${questreward}\n + ${questexp}exp`)
                                                        .setColor("#f2873f");

                                                    message.channel.send({embed:QclearEmb})

                                                    resulteco.save().catch(err => console.log(err));
                                                }
                                            })

                                            Osu_Quest.findOneAndDelete({
                                                currId: message.author.id
                                            }, (err) => {
                                                if (err) console.log(err)
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
                
                else if (diffChoice === `abandon`) {

                    fQuest.myself(Osu_Quest, message, async (res_quest) => {
                        if (!res_quest) {
                            let noqEmb = new Discord.RichEmbed()
                                .setAuthor(`No quest to abandon.`, `${osuIcon}`)
                                .setDescription(`⬞⬞▹ Use  **?osuquest <difficulty>**  to get one.`)
                                .setColor("#f2873f");

                            message.channel.send({embed:noqEmb})
                        }

                        else {

                            fCooldown.osuabandonq(Cooldown, message, async (resultabandon) => {
                                if (!resultabandon) {
                                    const newCooldownUser = new Cooldown({
                                        currId: message.author.id,
                                        command: "osuquest abandon",
                                        timenow: Date.now(),
                                        cdtime: Date.now()
                                    });
                                    newCooldownUser.save().catch(err => console.log(err));
                                }

                                else if (resultabandon) {

                                    resultabandon.timenow = Date.now()

                                    if (resultabandon.timenow >= resultabandon.cdtime) {

                                        let noqEmb = new Discord.RichEmbed()
                                            .setAuthor(`Are you sure? (Y/N)`, `${osuIcon}`)
                                            .setColor("#f2873f");

                                        const filter = m => m.author.id === message.author.id;
                                        message.channel.send({embed:noqEmb}).then(r => r.delete(10000));
                                        message.channel.awaitMessages(filter, {
                                            max: 1,
                                            time: 6000
                                        }).then(collected => {
                                        collected.delete(10000);

                                        if (collected.first().content === `n` || collected.first().content === `N`) {

                                            let noqdEmb = new Discord.RichEmbed()
                                                .setAuthor(`Oh, well good luck on the quest then!`, `${osuIcon}`)
                                                    .setColor("#f2873f");

                                            message.channel.send({embed:noqdEmb})
                                        }

                                        else if (collected.first().content === `y` || collected.first().content === `Y`) {

                                            let noqaEmb = new Discord.RichEmbed()
                                                .setAuthor(`Quest abandoned!`, `${osuIcon}`)
                                                .setColor("#f2873f");

                                            message.channel.send({embed:noqaEmb})

                                            resultabandon.cdtime = Date.now() + min * 5;
                                            resultabandon.save().catch(err => console.log(err));

                                            Osu_Quest.findOneAndDelete({
                                                currId: message.author.id
                                            }, (err) => {
                                                if (err) console.log(err)
                                                })
                                            }
                                        }).catch(err => {
                                            let noqwEmb = new Discord.RichEmbed()
                                                .setAuthor(`You didn't answer..`, `${osuIcon}`)
                                                .setColor("#f2873f");

                                            message.channel.send({embed:noqwEmb}).then(r => r.delete(5000));
                                        });
                                    }

                                    else {

                                        let t = Math.abs(resultabandon.cdtime - resultabandon.timenow) / 1000;
                                        let m = Math.floor(t / 60) % 60;
                                        let s = Math.floor(t % 60);

                                        let noqwEmb = new Discord.RichEmbed()
                                            .setAuthor(`You must wait ${m} minutes ${s} seconds before you can abandon another quest again.`, `${osuIcon}`)
                                            .setColor("#f2873f");

                                        message.channel.send({embed:noqwEmb})
                                    }
                                }
                            })    
                        }
                    })
                }
            }
        })
    }

    else {

        fQuest.myself(Osu_Quest, message, async (res_quest) => {

            if (!res_quest) {

                let noqEmb = new Discord.RichEmbed()
                    .setAuthor(`You don't have any quest right now.`, `${osuIcon}`)
                    .setDescription(`⬞⬞▹ Use  **?osuquest <difficulty>**  to get one.`)
                    .setColor("#f2873f");

                message.channel.send({embed:noqEmb})
            }

            else {

                let artist = res_quest.artist;
                let link = res_quest.link;
                let map_id = res_quest.map_id;
                let mapset_id = res_quest.mapset_id;
                let bpm = res_quest.bpm;
                let creator = res_quest.creator;
                let star = res_quest.star;
                let CS = res_quest.CS;
                let OD = res_quest.OD;
                let AR = res_quest.AR;
                let HP = res_quest.HP;
                let title = res_quest.title;
                let diffname = res_quest.diffname;
                let favorite = res_quest.favorite;
                let max_combo = res_quest.max_combo;
                let length = res_quest.length;
                let fullcombo = res_quest.fc;
                let mods = res_quest.mods;
                let status = res_quest.status;
                let rewrd = res_quest.reward;
                let exp = res_quest.exp;

                let qqqEmb = new Discord.RichEmbed()
                    .setAuthor(`${artist} - ${title} [${diffname}] by ${creator}`, `${osuIcon}`, link)
                    .setColor("#f2873f")
                    .setDescription(`\n**Quest** ▹ **${fullcombo}** this  ${mods}!\n**Reward** ▹ **¥${rewrd}** + **${exp}xp**\n\n**Download:** [map](https://osu.ppy.sh./d${map_id}) ⬞ [no video](https://osu.ppy.sh./d${map_id}n) ⬞ [direct](https://bloodcat.com/osu/s/${map_id})\n`)
                    .setThumbnail(`https://b.ppy.sh/thumb/${mapset_id}l.jpg`)
                    .addField(`Map Details`, `**Length:** ${length} ⬞ **BPM:** ${bpm}\n**Stars:** ☆${Number(star).toFixed(2)} ⬞ **Max Combo:** x${max_combo}\n\n**CS:** ${CS} ⬞ **AR:** ${AR} ⬞ **OD:** ${OD} ⬞ **HP:** ${HP}`)
                    .setFooter(`▹ ${status} ▹ ♥ ${favorite} ▹ Quest for ${message.author.username}`);

                message.channel.send({embed:qqqEmb});
            }
        })
    }
}