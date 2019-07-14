const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("Sorry, you don't have permission to do that.");
    return;
    }

    let banished = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!args[0]) {
        return;
    }

    if (!banished) {
        message.channel.send("Can't find user.")
    return;
    }

    if (args[0] === "<@598437846604316682>") {
        message.channel.send("You can't ban me!")
    return;
    }
    
    if (args[0] === "<@235047791431385088>") {
        message.channel.send("Hey, that's my creator!!")
    return;
    }

    let banishRes = args.slice(1).join(" ");

    if (!banishRes) {
        message.channel.send("You can't ban someone for no reason!")
    return;
    }

    if (banished.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("Sorry, that user cannot be banned.");
    return;
    }

    let banEmbed = new Discord.RichEmbed()
    .setColor("#f2873f")
    .addField("Kicked", `${banished} ID: ${banished.id}\nReason: ${banishRes}`)

    let bansendEmbed = new Discord.RichEmbed()
    .setDescription("Ban Issued")
    .setColor("#f2873f")
    .addField("Banned User", `${banished} ID: ${banished.id}`)
    .addField("Banned By", `<@${message.author.id}>`)
    .addField("Time", message.createdAt)
    .addField("Reason", banishRes);

    let mdrt = message.guild.channels.find(x => x.name === "moderation");

    if (!mdrt) {
        message.channel.send("You need to make a **#moderation** channel first before you do that.")
    return;
    }

    message.guild.member(banished).ban(banishRes);
    message.channel.send({embed:banEmbed});
    mdrt.send({embed:bansendEmbed});
}
