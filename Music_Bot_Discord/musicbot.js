require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const servers = {

}
const server = null; client.login(process.env.BOT_TOKEN)
const play = async (connection, message) => {
            const server = servers[message.guild.id];
            const stream = ytdl(server.queue[0], {
                filter: "audioonly",
                quality: "highestaudio"
            })
            server.dispatcher = connection.play(stream);
            let song = await (await ytdl.getInfo(server.queue[0])).videoDetails.title;
            server.dispatcher.on("finish", () => {
                        server.queue.shift();
                        if (!server.queue[0]) {
                            message.channel.send(song + " is playing: ")
                            play(connection,message)
                        }
                        else connection.disconnect();
                    })



                    

                    client.on("message", message => {
                        console.log(message.content)

                        const parsedMessage = message.content.split(" ") // play Url
                        switch (parsedMessage[0]) {
                            case "!play":
                                if (!parsedMessage[1]) {
                                    message.channel.send("You Should Enter Valid Url")
                                    return;
                                }
                                if (!message.member.voice.channel) {
                                    message.channel.send("There Should Be Valid Voice Channell")
                                }
                                if (!server[message.guild.id])
                                    servers[message.guild.id] = {
                                        queue: []
                                    }
                                server = servers[message.guild.id]
                                server.queue.push(parsedMessage[1])

                                if (server.queue.length <= 1)
                                    try {
                                        message.member.voice.channel.join().then(connection => {
                                            play(connection, message)
                                        })
                                    } catch (e) {
                                        console.log("Error Occured" + e)
                                    }

                                break;
                        }
                    })}