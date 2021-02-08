const { MessageEmbed } = require(`discord.js`);
var stack = require(`stackexchange`);
const filter = require(`../../resources/json/stackFilter.json`);
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed()
    embed.setColor(client.config.embeds.color)
    embed.setAuthor(`Stack Overflow search`)
    var returnArr;
    var lim = 0;


    var con = new stack({ version: 2.2 });

    filter.q = args.join(" ");
    filter.key = client.config.stackKey;

    await con.search.advanced(filter, (err, res) => {
        if (err) return message.channel.send(`🛑 **No posts found under those tags/titles**`).then(o => o.delete({ timeout: 10000 }));
        Object.values(res).forEach(f => {
            if (lim == 1) return;
            returnArr = f;
            lim++
        })

        if (returnArr.length == 0) {
            return message.channel.send(`🛑 **No posts found under those tags/titles**`).then(o => o.delete({ timeout: 10000 }));
        }
        returnArr.forEach(i => {
            var wasAnswered = `This question was not answered`;
            if (i.is_answered == true) {
                wasAnswered == "This question was answered"
            }
            embed.addField(`${i.title}`, `${wasAnswered}\n[View Page](${i.link})`, false)
        })

        embed.setDescription(`[View results](https://stackoverflow.com/search?q=${args.join("+")})`)
        embed.setFooter(`Search results for "${args.join(" ")}"`)
        return message.channel.send(embed)

    })
}



exports.conf = {
    description: "Get answers from stack overflow",
    args: true,
    params: [`QUERY`],
    aliases: ["stacko", "overflow", "stack-search"],
    usage: ">stack [query]",
}
exports.help = {
    name: "stack",
    category: "coding"
}