const Discord = require("discord.js");
const client = new Discord.Client();

const {
    prefix
} = require("./config.json")


module.exports = {
    readCommands: (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const arguments = message.content.slice(prefix.length).split(/ +/);
        const command = arguments.shift().toLowerCase();
    }
}
