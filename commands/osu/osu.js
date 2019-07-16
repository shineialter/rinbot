const Discord = require("discord.js");
const nodeosu = require("node-osu");
const Osu_User = require("./models/osu_users.js");
const fOsuUser = require("./utils/fOsuUser.js");

module.exports.run = async (bot, message, args) => {

        var osu = new nodeosu.Api('fe0518f75e945e284ecda7eda48ba2f7bf64789a', {
            notFoundAsError: true,
            completeScores: false
        });

        var uh = 0
        var osuIcon = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Osu%21Logo_%282015%29.svg/330px-Osu%21Logo_%282015%29.svg.png`

        if (args[0]) {

            var findPlayer = args[0];

            if (message.content.includes('"')) {

                var spaces = message.content.split('"')
                var spacedname = spaces[1]
            }
            
            else {

                spacedname = findPlayer;
            }
            console.log(findPlayer)
            try {
                
                var osugetuser = await osu.getUser({u: `${spacedname}`});
                var userid = osugetuser.id;
                var userosuname = osugetuser.name;
                var usercountry = osugetuser.country;
                var userpp = osugetuser.pp.raw;
                var userglobalrank = osugetuser.pp.rank;
                var userlocalrank = osugetuser.pp.countryRank;
                var userlevel = osugetuser.level;
                var useracc = osugetuser.accuracy;
                var userplaycount = osugetuser.counts.plays;
                var useravatar = `https://a.ppy.sh/${userid}?date=${uh}`
                var userlink = `https://osu.ppy.sh/users/${userid}`

                if (!userosuname) {

                    throw err;
                }

                let userEmb = new Discord.RichEmbed()
                    .setAuthor(`${userosuname}'s osu! Standard Profile`, `${osuIcon}`, userlink)
                    .setDescription(`**Global Rank** ⬞ #${Number(userglobalrank).toLocaleString()} ⬞ :flag_${usercountry.toLowerCase()}: #${Number(userlocalrank).toLocaleString()}\n**PP** ⬞ ${Number(userpp).toFixed(0)}\n**Level** ⬞ ${Number(userlevel).toFixed(0)}\n**Accuracy** ⬞ ${Number(useracc).toFixed(2)}%\n**Play Count** ⬞ ${Number(userplaycount).toLocaleString()}`)
                    .setThumbnail(useravatar)
                    .setColor("#f2873f")
                    .setFooter(`▹ Live from osu! server`)

                message.channel.send({embed:userEmb})
            }

            catch (err) {

                let uNotEmb = new Discord.RichEmbed()
                .setAuthor(`Can't find username!`, `${osuIcon}`)
                .setColor("#f2873f");

            message.channel.send({embed:uNotEmb})
            return;
            }
        }

        else {

            fOsuUser.myself(Osu_User, message, async (res_user) => {
                if (!res_user) {
    
                    let noUserEmb = new Discord.RichEmbed()
                    .setAuthor(`No username linked to your discord account!`, `${osuIcon}`)
                    .setDescription(`⬞⬞▹ Use  **?osuset user <username>**  to do so.`)
                    .setColor("#f2873f");
    
                    message.channel.send({embed:noUserEmb})
                }
    
                else {
    
                    var playerData = res_user.osu_username;
                    var osugetplayer = await osu.getUser({u: playerData});
                    var playername = osugetplayer.name;
                    var playerid = osugetplayer.id;
                    var playercountry = osugetplayer.country;
                    var playerpp = osugetplayer.pp.raw;
                    var playerglobalrank = osugetplayer.pp.rank;
                    var playerlocalrank = osugetplayer.pp.countryRank;
                    var playerlevel = osugetplayer.level;
                    var playeracc = osugetplayer.accuracy;
                    var playerplaycount = osugetplayer.counts.plays;
                    var playeravatar = `https://a.ppy.sh/${playerid}?date=${uh}`
                    var playerlink = `https://osu.ppy.sh/users/${playerid}`
    
                    let playerEmb = new Discord.RichEmbed()
                        .setAuthor(`${playername}'s osu! Standard Profile`, `${osuIcon}`, playerlink)
                        .setDescription(`**Global Rank** ⬞ #${Number(playerglobalrank).toLocaleString()} ⬞ :flag_${playercountry.toLowerCase()}: #${Number(playerlocalrank).toLocaleString()}\n**PP** ⬞ ${Number(playerpp).toFixed(0)}\n**Level** ⬞ ${Number(playerlevel).toFixed(0)}\n**Accuracy** ⬞ ${Number(playeracc).toFixed(2)}%\n**Play Count** ⬞ ${Number(playerplaycount).toLocaleString()}`)
                        .setThumbnail(playeravatar)
                        .setColor("#f2873f")
                        .setFooter(`▹ Live from osu! server`)
    
                    message.channel.send({embed:playerEmb})
                }
            })
        }    
    }

