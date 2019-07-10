const Discord = require("discord.js");
const client = new Discord.Client();
const cmds = require("./base/callcmds.js");  


client.once("ready", () => {   
  client.user.setActivity('[?] | owo', { type: 'PLAYING' });
  console.log("Connected and ready to go!");
});

client.on("message", message => {   
  cmds.readCommands(message);
});



// TOKEN

client.login(process.env.BOT_TOKEN);
