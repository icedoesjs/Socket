const { MessageEmbed } = require(`discord.js`);
exports.run = async(client, message, args) => {

        let embed = new MessageEmbed()
            .setColor(client.config.embeds.color)
            .setFooter(client.config.embeds.footers[0])
            .setThumbnail(client.config.logo)
        client.config.info.forEach(val => {
            let title = val.split(';')[0];
            let text = val.split(";")[1];

            embed.addField(title, text, false);

        });
        embed.addField(`Client Stats`, `**• User Count:** ${client.users.cache.size}\n**• Guild Count:** ${client.guilds.cache.size}\n**• Version:** ${client.config.update.split(';')[0]} (${client.config.update.split(';')[1]})\n[Support Guild](https://discord.xendev.us)`, true);
        embed.addField(`Developer Info`, `**• Discord.py:** 1.5.1\n**• Discord.js:** ${require(`../../../node_modules/discord.js`).version}\n**• Node:** ${process.version}\n[Invite Link](https://discord.com/oauth2/authorize?client_id=786481811681181738&permissions=537159744&scope=bot)`, true)
    return message.channel.send(embed);
}

exports.conf = {
    description: "See information about me",
    args: false,
    params: [`NONE`],
    aliases: ["information"],
    usage: ">info",
}
exports.help = {
    name: "info",
    category: "Info"
}