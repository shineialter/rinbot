const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {

        let noPermEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Error", `**Sorry, you don't have permission to do that.**`);

        message.channel.send({embed:noPermEmb})
    return;
    }

    var botIcon = bot.user.avatarURL
    var banished = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    var banReas = args.slice(1).join(" ");

    if (!args[0]) {
        return;
    }

    else if (!banished) {

        let noUserEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Ban Denied", `**Can't find user!**`);

        message.channel.send({embed:noUserEmb})
    return;
    }

    else if (args[0] === bot.user.toString()) {

        let rinEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Ban Denied", `**I can't ban myself!**`);

        message.channel.send({embed:rinEmb})
    return;
    }
    
    else if (args[0] === "<@235047791431385088>") {

        let creatEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Ban Denied", `**You can't ban my creator!!**`);

        message.channel.send({embed:creatEmb})
    return;
    }

    else if (!banReas) {

        let noResEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Ban Denied", `**You can't ban someone for no reason!**`);

        message.channel.send({embed:noResEmb})
    return;
    }

    else if (banished.hasPermission("MANAGE_MESSAGES")) {

        let hasPEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Ban Denied", `**Sorry, that user cannot be banned.**`);

        message.channel.send({embed:hasPEmb})
    return;
    }

    else {
        let banEmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Banned", `${banished} ID: ${banished.id}\nReason: ${banReas}`)

        let banSendEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setDescription("Ban Issued")
        .setColor("#f2873f")
        .addField("Banned User", `${banished} ID: ${banished.id}`)
        .addField("Banned By", `<@${message.author.id}>`)
        .addField("Time", message.createdAt)
        .addField("Reason", banReas);

        let mdrt = message.guild.channels.find(x => x.name === "moderation");

        if (!mdrt) {

            let noMdrtEmb = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}`, `${botIcon}`)
            .setColor("#f2873f")
            .addField("Ban Denied", `Missing **#moderation** channel.`);

            message.channel.send({embed:noMdrtEmb})
        return;
        }

        message.guild.member(banished).ban(banReas);
        message.channel.send({embed:banEmbed});
        mdrt.send({embed:banSendEmb});
    }
    
}