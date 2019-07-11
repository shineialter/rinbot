const Discord = require("discord.js");
const repCd = new Set();
const repCdban = new Set();

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

    if (args[0] === "<@235047791431385088>") {
        message.channel.send("Hey, that's my creator!!")
    return;
    }

    if (args[0] === bot.user.toString()) {
        message.channel.send("Why are you reporting me?")
        .then(message => {
            message.delete(8000)
        })
        setTimeout(() => {
            message.channel.send("I won't accept reports from you then. (You can't report someone for the next **10 minutes**.)")
            .then(message => {
                message.delete(5000)
            })
        }, 3000)

        repCdban.add(message.author.id);
        setTimeout(() => {
            repCdban.delete(message.author.id);
        }, 100000)
    return;
    }

    if (!repUser) {
        message.channel.send("Can't find user.")
        .then(message => {
            message.delete(4000)
        })
    return;
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
    return;
    }

    if (repCd.has(message.author.id)) {
        message.channel.send(`${message.author.toString()}, you have to wait **5 minutes** before you can report someone again.`)
        .then(message => {
            message.delete(5000)
        return;
        })

    } else if (repCdban.has(message.author.id)) {
        message.channel.send("Report **denied**.")
        .then(message => {
            message.delete(5000)
        return;
        })

    } else {
        //message.delete().catch(O_o=>{});
        message.channel.send({embed:repEmbed})
        repChan.send({embed:repsendEmbed});

        repCd.add(message.author.id);
        setTimeout(() => {
            repCd.delete(message.author.id);
        }, 300000)
    }
}