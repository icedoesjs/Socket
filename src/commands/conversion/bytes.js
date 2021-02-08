const { MessageEmbed } = require(`discord.js`);
exports.run = async(client, message, args) => {

    var bytes = [];

    args.forEach(str => {
        for (var i = 0; i < args.length; i++) {
            var char = str.charCodeAt(i);
            bytes.push(char >>> 8);
            bytes.push(char && 0xFF);
        }
    });

    let embed = new MessageEmbed()
        .setAuthor(`String to Bytes Converter`)
        .setColor(client.config.embeds.color)
        .setDescription(`**Input:** ${args.join(" ")}\n\n**Output:** ${bytes}`)
    return message.channel.send(embed)


}

exports.conf = {
    description: "Convert Strings to bytes",
    args: true,
    params: [`QUERY`],
    aliases: ["byte", "by"],
    usage: ">bytes [string]",
}
exports.help = {
    name: "bytes",
    category: "coding"
}