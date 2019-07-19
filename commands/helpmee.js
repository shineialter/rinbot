const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.avatarURL

    if (!args[0]) {

        let helplistEmbed = new Discord.RichEmbed()
            .setAuthor(`Rin Commands List`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?help <command>** for more info.`)
            .addField("General", `▹ **botinfo** ▹ binfo\n▹ **serverinfo** ▹ sinfo\n▹ **report**\n▹ **kick**\n▹ **ban**`)
            .addField("Economy", `▹ **profile**\n▹ **balance** ▹ bal\n▹ **dailybalance** ▹ dailybal ▹ dbal`)
            .addField("Fun", `▹ **gachasimulator** ▹ gachasim ▹ gsim\n`)
            .addField("osu!", `▹ **osu**\n▹ **osuset**\n▹ **osuquest**`);

        message.channel.send({embed:helplistEmbed});
    }

    else if (args[0] === "botinfo" || args[0] === "binfo") {

        let helpbinfo = new Discord.RichEmbed()
            .setAuthor(`Bot Info Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?botinfo**`)
            .addField("Function", `▹ Shows bot's information.\n\n**[aliases]**\n▹ binfo`);

        message.channel.send({embed:helpbinfo});
    }

    else if (args[0] === "serverinfo" || args[0] === "sinfo") {

        let helpsinfo = new Discord.RichEmbed()
            .setAuthor(`Server Info Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?serverinfo**`)
            .addField("Function", `▹ Shows current server's information.\n\n**[aliases]**\n▹ sinfo`);

        message.channel.send({embed:helpsinfo});
    }

    else if (args[0] === "report") {

        let helpreport = new Discord.RichEmbed()
            .setAuthor(`Report Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?report** <@tag user> <reason>`)
            .addField("Function", `▹ Reports a user. Useful if you have tons of members.`)
            .addField("Example", '▹ ?report `@Shinei` `Spamming in #general`');

        message.channel.send({embed:helpreport});
    }

    else if (args[0] === "kick") {

        let helpkick = new Discord.RichEmbed()
            .setAuthor(`Kick Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?kick** <@tag user> <reason>`)
            .addField("Function", `▹ Kicks out a user from the server.`)
            .addField("Example", '▹ ?kick `@Shinei` `Bad behavior`');

        message.channel.send({embed:helpkick});
    }

    else if (args[0] === "ban") {

        let helpban = new Discord.RichEmbed()
            .setAuthor(`Ban Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?Ban** <@tag user> <reason>`)
            .addField("Function", `▹ Ban a user from the server.`)
            .addField("Example", '▹ ?ban `@Shinei` `I had to :(`');

        message.channel.send({embed:helpban});
    }

    else if (args[0] === "profile") {

        let helpbal = new Discord.RichEmbed()
            .setAuthor(`Profile Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?profile** <@tag user>`)
            .addField("Function", `▹ Shows your profile. Tag a user to show theirs.`)
            .addField("Example", '▹ ?profile `@Shinei`');

        message.channel.send({embed:helpbal});
    }

    else if (args[0] === "bal" || args[0] === "balance") {

        let helpbal = new Discord.RichEmbed()
            .setAuthor(`Balance Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?balance** <@tag user>`)
            .addField("Function", `▹ Shows how much money do you have. Tag a user to show their money.`)
            .addField("Example", '▹ ?balance `@Shinei`\n\n**[aliases]**\n▹ bal');

        message.channel.send({embed:helpbal});
    }

    else if (args[0] === "dailybalance" || args[0] === "dailybal" || args[0] === "dbal") {

        let helpdbal = new Discord.RichEmbed()
            .setAuthor(`Daily Balance Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?dailybalance**`)
            .addField("Function", `▹ Recieves daily payout.\n\n**[aliases]**\n▹ dailybal ▹ dbal`);

        message.channel.send({embed:helpdbal});
    }

    else if (args[0] === "gachasimulator" || args[0] === "gachasim" || args[0] === "gsim") {

        let helpgsim = new Discord.RichEmbed()
            .setAuthor(`Gacha Simulator Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?gachasimulator** <gacha type> <amount>`)
            .addField("Function", `▹ Plays a gacha simulator to test your luck in gacha owo. \n\n**Warning!** \nCurrently this is only a simulator, you won't get any rewards!\n\n**[more settings]**\n▹ **types** - List all gacha types.`)
            .addField("Example", `▹ ?gachasimulator imas 10\n\n**[aliases]**\n▹ gachasim ▹ gsim`);

        message.channel.send({embed:helpgsim});
    }

    else if (args[0] === "osu") {

        let helposs = new Discord.RichEmbed()
            .setAuthor(`osu! Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?osu** <username>`)
            .addField("Function", `▹ Checks an osu!Standard profile. You can leave the username blank to check yours.`)
            .addField("Example", '▹ ?osu `shinei`');

        message.channel.send({embed:helposs});
    }

    else if (args[0] === "osuset") {

        let helpban = new Discord.RichEmbed()
            .setAuthor(`osu! Set Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?osuset** <type> <username>`)
            .addField("Function", `▹ Define some osu! user settings to your discord account.\n\n**[more settings]**\n▹ **user** - Link an osu! Standard profile to your discord account. Use " for spaced username.`)
            .addField("Example", '▹ ?osuset `user` `shinei` ⬞ ?osuset `user` `"My aim sucks"`');

        message.channel.send({embed:helpban});
    }

    else if (args[0] === "osuquest") {

        let helpban = new Discord.RichEmbed()
            .setAuthor(`osu! Quest Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **?osuquest** <difficulty>`)
            .addField("Function", `▹ Do a random beatmap with challanges.\n\n**[more settings]**\n▹ **easy** - Get an easy quest.\n▹ **hard** - Get a hard quest.\n▹ **turnin / ti** - Turn in a quest.\n▹ **abandon** - Abandon your current quest.`)
            .addField("Example", '▹ ?osuquest `easy`');

        message.channel.send({embed:helpban});
    }

    else {

        let helpnope = new Discord.RichEmbed()
            .setAuthor(`Help Command`, `${botIcon}`)
            .setColor("#f2873f")
            .setDescription(`⬞⬞▹ **Command not found!**`)

        message.channel.send({embed:helpnope});
    }
}