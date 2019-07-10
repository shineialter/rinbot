const Discord = require("discord.js");
const client = new Discord.Client();
const cmds = require("./callcmds.js");  


client.once("ready", () => {    
  console.log("Connected and ready to go!");
});

client.on("message", message => {   
  cmds.readCommands(message);
});



// TOKEN

client.login(process.env.BOT_TOKEN);
