var TinyURL = require('tinyurl');
exports.run = async(client, message, args) => {


    if (!args[0].includes("https://") || !args[0].includes("https://") || !args[0].includes("www.")) {
        return message.channel.send(`🛑 **Please provide a valid link**`).then(i => i.delete({ timeout: 10000 }));
    }

    TinyURL.shorten(args[0], function(res, err) {
        if (err) return message.channel.send(`🛑 **I failed to shorten that link.**`).then(j => j.delete({ timeout: 10000 }));
        if (res) {
            return message.channel.send(`✅ **Here is your new link: ${res}**`)
        } else {
            return message.channel.send(`🛑 **I failed to shorten that link.**`).then(j => j.delete({ timeout: 10000 }));
        }
    })


}

exports.conf = {
    description: "Shorten a link",
    args: true,
    params: [`LINK`],
    aliases: ["short", "shrink"],
    usage: ">shorten [LINK]",
}
exports.help = {
    name: "shorten",
    category: "misc"
}