const { MessageEmbed } = require(`discord.js`);
const { embeds } = require("../../../config");
exports.run = async(client, message, args) => {

    if (isNaN(args[0])) return message.channel.send(`🛑 **Please provide a discord ID.**`).then(d => d.delete({ timeout: 10000 }));
    var user = await client.users.fetch(args[0])
    const profileE = new MessageEmbed()
    profileE.setColor(client.config.embeds.color);
    if (!user) return message.channel.send(`⚠️ **That user was not found**`).then(d => d.delete({ timeout: 10000 }));
    profileE.setAuthor(`User information for ${user.username}` + "#" + user.discriminator)
    let data = ``;

    if (user.bot == true) {
        data += `🤖 ${user.username} is a Bot.\n`
    }

    if (user.bot !== true) {
        data += `🧍 ${user.username} is NOT a Bot.\n`
    }
    if (user.verified == true) {
        data += `✅ ${user.username} has verified their email.`
    }

    if (user.verified !== true) {
        data += `❌ ${user.username} has NOT verified their email.`
    }

    profileE.setFooter(`Requested by ${message.author.username}`);
    profileE.setDescription(data);
    return message.channel.send(profileE)



}

exports.conf = {
    description: "Get a discord user by ID",
    args: true,
    params: [`ID`],
    aliases: ["search", "find"],
    usage: ">user [ID]",
}
exports.help = {
    name: "user",
    category: "discord"
}