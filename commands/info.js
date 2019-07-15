const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let boticon = bot.user.displayAvatarURL;
    let botinfoembed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, `${boticon}`)
        .setDescription("Bot Information")
        .setColor("#f2873f")
        .setThumbnail(boticon)
        .addField("Bot Name", bot.user.username)
        .addField("Developed By", "Shinei#7000")
        .addField("Contributors", "Cronix#0363")
        .addField("Servers", `Currently online on ${bot.guilds.size} servers.`);

    message.channel.send({embed:botinfoembed});
}
