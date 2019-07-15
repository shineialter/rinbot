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
    var booted = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    var bootRes = args.slice(1).join(" ");

    if (!args[0]) {
        return;
    }

    else if (!booted) {

        let noUserEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Kick Denied", `**Can't find user!**`);

        message.channel.send({embed:noUserEmb})
    return;
    }

    else if (args[0] === bot.user.toString()) {

        let rinEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Kick Denied", `**I can't kick myself!**`);

        message.channel.send({embed:rinEmb})
    return;
    }
    
    else if (args[0] === "<@235047791431385088>") {

        let creatEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Kick Denied", `**You can't kick my creator!!**`);

        message.channel.send({embed:creatEmb})
    return;
    }

    else if (!bootRes) {

        let noResEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Kick Denied", `**You can't kick someone for no reason!**`);

        message.channel.send({embed:noResEmb})
    return;
    }

    else if (booted.hasPermission("MANAGE_MESSAGES")) {

        let hasPEmb = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Kick Denied", `**Sorry, that user cannot be kicked.**`);

        message.channel.send({embed:hasPEmb})
    return;
    }

    else {
        let bootEmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setColor("#f2873f")
        .addField("Kicked", `${booted} ID: ${booted.id}\nReason: ${bootRes}`)

        let bootsendEmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${botIcon}`)
        .setDescription("Kick Issued")
        .setColor("#f2873f")
        .addField("Kicked User", `${booted} ID: ${booted.id}`)
        .addField("Kicked By", `<@${message.author.id}>`)
        .addField("Time", message.createdAt)
        .addField("Reason", bootRes);

        let mdrt = message.guild.channels.find(x => x.name === "moderation");

        if (!mdrt) {

            let noMdrtEmb = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}`, `${botIcon}`)
            .setColor("#f2873f")
            .addField("Kick Denied", `Missing **#moderation** channel.`);

            message.channel.send({embed:noMdrtEmb})
        return;
        }

        message.guild.member(booted).kick(bootRes);
        message.channel.send({embed:bootEmbed});
        mdrt.send({embed:bootsendEmbed});
    }
    
}