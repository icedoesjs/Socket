const { default: Axios } = require('axios');
const { MessageEmbed } = require(`discord.js`);
const { ref } = require(`../../resources/json/supportedLangs.json`);
var http = require('http');
exports.run = async(client, message, args) => {
    var matched = false;

    let quickmap = [
        "javascript",
        "js",
        "python",
        "py"
    ]
    let lang = args[0].toLowerCase()
    if (quickmap.includes(lang)) matched = true;



    if (!matched) return message.channel.send(`🛑 **${lang} is not supported by the documentation viewer, to view all languages try ${client.config.prefix}help ref languages**`).then(o => o.delete({ timeout: 10000 }));

    let querys = args.slice(1).join(" ");


    let embed = new MessageEmbed();

    embed.setColor(client.config.embeds.color);
    if (!querys) return message.channel.send(`🛑 **You must provide a query after the language**`).then(o => o.delete({ timeout: 10000 }));
    if (matched == true) {
        if (lang == "js" || lang == "javascript") {
            const query = require('mdn-scraper').default;
            const res = await query(querys);
            if (!res) return message.channel.send(`No MDN documentation found for **${args[0]}**`).then(g => g.delete({ timeout: 10000 }));
            embed.setTitle(res.title);
            embed.setURL(res.url);
            embed.setDescription(res.parsed);
            return message.channel.send(embed)
        } else if (lang == "python" || lang == "py") {}

    }

}

exports.conf = {
    description: "Search mutiple docs websites for popular languges/frameworks",
    args: true,
    params: [`QUERY`],
    aliases: ["documentation", "ref", "doc"],
    usage: ">refrence [query]",
    additional: "More languages coming soon",
    languages: "Javascript [JS]"
}
exports.help = {
    name: "reference",
    category: "coding"
}