const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (args[0] == "help") {
        message.reply("```Usage: ?report <user> <reason>```");
    return;
    }

    let repUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!args[0]) {
        return;
    }

    if (args[0] === message.author.toString()) {
        message.channel.send("You can't report yourself.")
    return;
    }

    if (!repUser) {
        message.channel.send("Can't find user.")
        .then(message => {
            message.delete(4000)
        })  
    }

    let repReas = args.slice(1).join(" ");

    if (!repReas) {
        message.channel.send("You can't report someone for no reason!")
    return;
    }

    let repEmbed = new Discord.RichEmbed()
    .setColor("#f2873f")
    .addField("Report Submitted", `${repUser} ID: ${repUser.id}\nReason: ${repReas}`)

    let repsendEmbed = new Discord.RichEmbed()
    .setDescription("Report Issued")
    .setColor("#f2873f")
    .addField("Reported User:", `${repUser} ID: ${repUser.id}`)
    .addField("Reported By:", `${message.author.username}`)
    .addField("Channel:", message.channel)
    .addField("Time:", message.createdAt)
    .addField("Reason:", repReas);

    let repChan = message.guild.channels.find(x => x.name === "reports");

    if (!repChan) {
        message.channel.send("You need to make a **#reports** channel first.")
    }

    //message.delete().catch(O_o=>{});
    message.channel.send({embed:repEmbed})
    repChan.send({embed:repsendEmbed});
}

