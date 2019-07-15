
const fCooldown = require("./commands/utils/fCooldown.js");
const Cooldown = require("./models/cooldowns.js");

module.exports.run = (bot, message, args) => {

 
    fCooldown.test(Cooldown, message, (result) => {
        if (!result) {
            const newCooldownUser = new Cooldown({
                currId: message.author.id,
                command: "test",
                timenow: Date.now(),
                cdtime: Date.now()
            });
            newCooldownUser.save().catch(err => console.log(err));
        } 
        
        else if (result) {

            var second = 1000;
            var minute = second * 60;
            var hour = minute * 60;
            var day = hour * 24;

            result.timenow = Date.now()
            console.log("now is " + result.timenow);
                
                if (result.timenow >= result.cdtime) {
                    console.log("GOOO")

                    result.cdtime = Date.now() + 10000;
                    result.save().catch(err => console.log(err));
                    console.log("cd now is " + result.cdtime);

                } else {
                    console.log("user still has " + Math.round((result.cdtime - result.timenow)/second) + " second left")


                    result.save().catch(err => console.log(err));
                }
            } 
        })
    }