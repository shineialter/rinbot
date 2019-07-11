const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) {
        message.channel.send("Sorry, you don't have permission to do that.")
    return;
    }

    if (!args[0]) {
        return;
    }

    if (args[0].length > 2) {
        message.channel.send("Prefix is too long!");
    return;
    }

    let prefixes = JSON.parse(fs.readFileSync("./data/pref.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    if (args[0] == "help") {
        message.reply("```Usage: prefix <new prefix>```")
    return;
    }

    fs.writeFile("./data/pref.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });

    let preEmbed = new Discord.RichEmbed()
    .setColor("#f2873f")
    .setTitle("Prefix Set!")
    .setDescription(`Prefix changed to ${args[0]}`);

    message.channel.send({embed:preEmbed});
}