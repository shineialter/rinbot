const Discord = require("discord.js");
const nodeosu = require("node-osu");
const Osu_User = require("./models/osu_users.js");
const fOsuUser = require("./utils/fOsuUser.js");

module.exports.run = async (bot, message, args) => {
    
        var osu = new nodeosu.Api('${process.env.OSUAPI_TOKEN}', {
            notFoundAsError: true,
            completeScores: false
        });

        var osuIcon = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Osu%21Logo_%282015%29.svg/330px-Osu%21Logo_%282015%29.svg.png`
        
        if (args[0] === `user`) {

            try {

                var otherargs = args.slice(1).join(" ");

                if (!otherargs) {

                    let noUserEmb = new Discord.RichEmbed()
                    .setAuthor(`You didn't input any username!`, `${osuIcon}`)
                    .setColor("#f2873f");

                message.channel.send({embed:noUserEmb})
                return;
                }

                if (message.content.includes('"')) {

                    var spaces = message.content.split('"')
                    var spacedname = spaces[1]
                }
                
                else {

                    spacedname = otherargs;
                }

                var osugetuser = await osu.getUser({u: spacedname})
                var osuname = osugetuser.name

                if (!osuname) {

                    throw "notfound";
                }

                else {

                    fOsuUser.myself(Osu_User, message, (res_user) => {
                        if (!res_user) {
                            const setUser = new Osu_User({
                                currId: message.author.id,
                                osu_username: osuname
                            });
    
                            let setUserEmb = new Discord.RichEmbed()
                            .setAuthor(`Username ⏵ ${osuname} is now linked to your discord account!`, `${osuIcon}`)
                            .setColor("#f2873f");
        
                            message.channel.send({embed:setUserEmb})
                                
                            setUser.save().catch(err => console.log(err));
                        }
        
                        else if (res_user) {
    
                            res_user.osu_username = otherargs;
    
                            let setUserEmb = new Discord.RichEmbed()
                            .setAuthor(`You have changed your osu! username to ⏵${osuname}`, `${osuIcon}`)
                            .setColor("#f2873f");
    
                            message.channel.send({embed:setUserEmb})
        
                            res_user.save().catch(err => console.log(err));
                        }
                    })
                }

            } 
            
            catch (err) {

                let uNotEmb = new Discord.RichEmbed()
                    .setAuthor(`Can't find username in osu! database!`, `${osuIcon}`)
                    .setColor("#f2873f");
    
                message.channel.send({embed:uNotEmb})
            }
        }
    }

