require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const userData = {}

client.on('ready', () => {
    console.log('Bot is Online !')
})
//Reacting User Messsage
client.on('message', msg => {
    if (msg.content === 'Arsenal') {
        msg.channel.send("God Bless You")
        msg.reply('Cancer Team ')

    }
    //Discord Pp Display 
    if (msg.content === '.img') {
        msg.reply(msg.author.displayAvatarURL())
    }
    //Github Photo Display 
    if (msg.content.startsWith("github")) {
        const GithubAttachment = new Discord.MessageAttachment("https://github.com/" + msg.content.split("-")[1] + ".png?size=160")
        msg.channel.send(GithubAttachment)
    }






    // if (msg.content === '!admin'){
    //     msg.member.roles.add("783457594500972544")
    // }
})

//User Message Count Display
client.on('message', msg => {
    console.log("User Message  " + msg.content)
    const username = msg.author.username
    if (!userData[username])
        userData[username] = {
            msgcount: 0
        }
    userData[username].msgcount++
    console.log(JSON.stringify(userData, 2, 2))
    if (msg.content === ('!msgcount'))
        msg.channel.send(username + "'s" + "  Message Count is :" + (userData[username].msgcount))
})

//User Ban
client.on("message", msg => {
    const parsedString = msg.content.split(" ");
    const username = msg.author.username



    if (parsedString[0] == '!ban') {
        if (parsedString[1]) {
            const user = msg.mentions.users.first();
            if (user) {
                const member = msg.guild.member(user);
                if (!member) {
                    msg.reply("User couldnt find")
                    return;
                }
                member.ban({
                    reason: 'You didnt act well.'
                }).then(() => {
                    msg.channel.send(`${user.tag}  Fired of the server `)
                }).catch((error) => {
                    msg.reply("Error Occurred")
                    console.log(error)
                })

            }
        } else {
            msg.reply("You should type username")
        }
    }




})
 //User Kick
client.on("message", msg => {
    const parsedString = msg.content.split(" ");
    const username = msg.author.username



    if (parsedString[0] == '!kick') {
        if (parsedString[1]) {
            const user = msg.mentions.users.first();
            if (user) {
                const member = msg.guild.member(user);
                if (!member) {
                    msg.reply("User couldnt find")
                    return;
                }
                member.kick({reason: 'You didnt act well.'
                }).then(() => {
                    msg.channel.send(`${user.tag}  Fired of the server `)
                }).catch((error) => {
                    msg.reply("Error Occurred")
                    console.log(error)
                })

            }
        } else {
            msg.reply("You should type username")
        }
    }




})

client.login(process.env.BOT_TOKEN)