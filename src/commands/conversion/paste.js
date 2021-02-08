const { MessageEmbed, MessageAttachment } = require(`discord.js`);
var hastebin = require('hastebin');
exports.run = async(client, message, args) => {
    if (!args.join(" ").startsWith("`")) return message.channel.send(`🛑 **Please provide the paste inside code blocks so we can properly read it.**`).then(d => d.delete({ timeout: 10000 }))

    var textVal = args.join(" ").replace("```", "");
    var paste = textVal.replace("```", "");

    hastebin.createPaste(paste, {
        raw: true,
        contentType: 'text/plain',
        server: 'https://hastebin.com'
    }).then(res => {
        return message.channel.send(`✅ **Your paste was created here: ${res}**`)
    }).catch((e) => {
        return message.channel.send(`🛑 **Your paste failed to post, this could do to mutiple requests too soon or an internal server error, try again later.**`).then(d => d.delete({ timeout: 10000 }))
    })


}

exports.conf = {
    description: "Create a paste of your text/code",
    args: true,
    params: [`TEXT`],
    aliases: ["hastebin", "copy"],
    usage: ">paste [TEXT]",
}
exports.help = {
    name: "paste",
    category: "misc"
}