const { MessageEmbed } = require(`discord.js`);
const djsdocs = require(`djsdocs-generator`);
exports.run = async(client, message, args) => {

    let branch = "stable"

    let libChanged = false;

    let libCheck = args[0].toLowerCase()

    if (libCheck === "stable" || libCheck === "master") {
        branch = args[0].toLowerCase();
        libChanged = true;
    } else if (libCheck == "commando") {
        branch = "commando";
        libChanged = true;
    }

    var res;

    if (libChanged == true) {
        res = await djsdocs.search(branch, args[1]);
    } else {
        res = await djsdocs.search(branch, args[0])
    }


    if (!res || !res.fields && libChanged == false) return message.channel.send(`No docs found for **${args[0]}** in **${branch}**`).then(del => del.delete({ timeout: 5000 }))
    if (!res.fields && libChanged !== false) return message.channel.send(`No docs found for **${args[1]}** in **${branch}**`).then(del => del.delete({ timeout: 5000 }))

    let embed = new MessageEmbed()

    embed.setTitle(res.author.name)
    embed.setURL(res.author.url)
    embed.setDescription(res.description);

    embed.setColor(client.config.embeds.color)

    res.fields.forEach(d => {
        embed.addField(d.name, d.value);
    });

    return message.channel.send(embed);

}

exports.conf = {
    description: "Search the discord.js docs",
    args: true,
    params: [`QUERY`],
    aliases: ["d.js", "doc", "djs"],
    usage: ">docs [branch] [query]",
    additional: "Branches: stable, master, commando\nNotes: If no branch is provided, the system will default to stable."
}
exports.help = {
    name: "docs",
    category: "coding"
}