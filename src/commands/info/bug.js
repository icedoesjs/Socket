const { MessageEmbed, MessageAttachment } = require(`discord.js`);
var fs = require('fs');
const path = require('path');
exports.run = async(client, message, args) => {


    var num = Math.floor(Math.random() * (1952 - 165)) + 165;

    let embed = new MessageEmbed()
    embed.setColor(client.config.embeds.color);
    embed.setFooter(client.config.embeds.footers[0]);

    embed.setAuthor(`Bug report (${num}) by ${message.author.tag}`)
    embed.setDescription(args.join(" "));
    let me = client.users.cache.get("389558396195438593");
    await me.send(embed);

    return message.channel.send("``#" + num + "``" + `**Your bug was reported, thank you for contributing to the project.**`)

}

exports.conf = {
    description: "Report a BUG",
    args: true,
    params: [`bug`],
    aliases: ["report"],
    usage: ">bug",
}
exports.help = {
    name: "bug",
    category: "Info"
}