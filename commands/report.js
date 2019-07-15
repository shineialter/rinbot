const Discord = require("discord.js");
const getCd = new Set();

//Report cooldowns are not universal.
module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.avatarURL
    var repUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    var repReas = args.slice(1).join(" ");

    if (args[0] == "help") {

        let helpEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Report System", `Correct usage:  ?report <tag user> <reason>`)
        .addField("Example", "?report @Shinei for making Rin broken :(");

        message.channel.send({embed:helpEmb})
    return;
    }
    
    else if (!args[0]) {
        return;
    }

    else if (args[0] === message.author.toString()) {

        let urselfEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Report System", `**You can't report yourself!**`);

        message.channel.send({embed:urselfEmb})
    return;
    }

    else if (args[0] === "<@235047791431385088>") {

        ownEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Report System", `**You can't report my creator!!!**`);

        message.channel.send({embed:ownEmb})
    return;
    }

    else if (args[0] === bot.user.toString()) {
        
        rinEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Report System", `**...**`);

        message.channel.send({embed:rinEmb})
    return;
    }

    else if (!repUser) {

        noUserEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Report System", `**Can't find user!**`);

        message.delete(4000).catch(O_o=>{});
        message.channel.send({embed:noUserEmb})
        .then(message => {
            message.delete(4000)
        })
    return;
    }

    else if (!repReas) {

        noReasEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Report System", `**You can't report someone for no reason!**`);

        message.channel.send({embed:noReasEmb})
    return;
    }

    else if (args[0]) {

        let repEmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Report Submitted", `${repUser} ID: ${repUser.id}\nReason: ${repReas}`)
    
        let repsendEmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setDescription("Report Issued")
        .setColor("#f2873f")
        .addField("Reported User:", `${repUser} ID: ${repUser.id}`)
        .addField("Reported By:", `${message.author.username}`)
        .addField("Channel:", message.channel)
        .addField("Time:", message.createdAt)
        .addField("Reason:", repReas);
    
        let repChan = message.guild.channels.find(x => x.name === "reports");
    
        if (!repChan) {
    
            noChEmb = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}`, `${botIcon}`)
            .setColor("#f2873f")
            .addField("Report System", `Missing **#reports** channel`);
    
            message.channel.send({embed:noChEmb})
        return;
        }

        else if (getCd.has(message.author.id)) {

            cdEmb = new Discord.RichEmbed()
                .setAuthor(`${bot.user.username}`, `${botIcon}`)
                .setColor("#f2873f")
                .addField("Report Denied", `${message.author.toString()}, **you have to wait 5 minutes before you can report again**.`);
    
            message.channel.send({embed:cdEmb});
            return;
        }

        else {
            
            message.channel.send({embed:repEmbed})
            repChan.send({embed:repsendEmbed});

            getCd.add(message.author.id)
            setTimeout(() => {
                getCd.delete(message.author.id)
            }, 300000);
        }

    }
}

        //message.delete().catch(O_o=>{});