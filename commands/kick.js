const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("Sorry, you don't have permission to do that.");
    }

    let booted = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!args[0]) {
        return;
    }

    if (!booted) {
        message.channel.send("Can't find user.")
    return;
    }

    if (args[0] === booted) {
        message.channel.send("You can't kick me!")
    return;
    }
    
    if (args[0] === "<@235047791431385088>") {
        message.channel.send("Hey, that's my creator!!")
    return;
    }

    let bootRes = args.slice(1).join(" ");

    if (!bootRes) {
        message.channel.send("You can't kick someone for no reason!")
    return;
    }

    if (booted.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("Sorry, that user cannot be kicked.");
    return;
    }

    let bootEmbed = new Discord.RichEmbed()
    .setColor("#f2873f")
    .addField("Kicked", `${booted} ID: ${booted.id}\nReason: ${bootRes}`)

    let bootsendEmbed = new Discord.RichEmbed()
    .setDescription("Kick Issued")
    .setColor("#f2873f")
    .addField("Kicked User", `${booted} ID: ${booted.id}`)
    .addField("Kicked By", `<@${message.author.id}>`)
    .addField("Time", message.createdAt)
    .addField("Reason", bootRes);

    let mdrt = message.guild.channels.find(x => x.name === "moderation");

    if (!mdrt) {
        message.channel.send("You need to make a **#moderation** channel first before you do that.")
    return;
    }

    message.guild.member(booted).kick(bootRes);
    message.channel.send({embed:bootEmbed});
    mdrt.send({embed:bootsendEmbed});
}