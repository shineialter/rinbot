const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let servericon = message.guild.displayAvatarURL;
    let serverinfoembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#f2873f")
        .setThumbnail(servericon)
        .addField("Server Name", message.guild.name)
        .addField("Owner", message.guild.owner)
        .addField("Created On", message.guild.createdAt)
        .addField("Total Members", message.guild.memberCount);

    message.channel.send({embed:serverinfoembed});
}