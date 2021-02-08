const { MessageEmbed } = require(`discord.js`);
const query = require('libnpmsearch');
exports.run = async(client, message, args) => {

    await query(args[0].toLowerCase()).then(res => {
        let embed = new MessageEmbed()
        var aName;
        var pName;
        if (!res || !res[0].name) return message.channel.send(`No package found for **${args[0]}**.`).then(f => f.delete({ timeout: 5000 }))


        if (!res[0].author || res[0].author == undefined) {
            aName = "Unknown"
        } else {
            aName = res[0].author.name;
        }
        if (!res[0].publisher == undefined) {
            pName = "Unknown"
        } else {
            pName = res[0].publisher.username
        }
        embed.setColor(client.config.embeds.color);
        embed.setTitle(`${res[0].name} (${res[0].version})`);
        embed.setURL(res[0].links.npm)
        embed.setDescription(res[0].description);
        embed.addField(`Author`, aName)
        embed.addField(`Publisher`, pName)

        let exPackages = ``;

        res.forEach(r => {
            exPackages += `**${r.name}** (${r.version})\n`
        })

        embed.addField(`Additional Packages`, exPackages)


        return message.channel.send(embed)
    })





}

exports.conf = {
    description: "Search npm packages",
    args: true,
    params: [`QUERY`],
    aliases: ["node", "modules", "n-modules"],
    usage: ">npm [module]"
}
exports.help = {
    name: "npm",
    category: "coding"
}