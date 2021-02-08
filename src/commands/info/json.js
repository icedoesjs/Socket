const { MessageEmbed } = require(`discord.js`);
exports.run = async(client, message, args) => {
    if (!args[0].includes("`")) {
        return message.channel.send(`🛑 **The provided json needs to be put in a code block**`).then(o => o.delete({ timeout: 10000 }));
    } else {
        try {
            var JSONVal = args.join(" ").replace("```", "");
            var actualVal = JSONVal.replace("```", "")
            JSON.parse(actualVal);

            return message.channel.send(`✅ **The provided JSON was validated and ran correctly!**`)
        } catch (e) {
            return message.channel.send(`⚠️ **The provided JSON returned an error when parsed**\n**The full stack is not shown to bypass the char limit.**\n\n${e}`)
        }
    }
}

exports.conf = {
    description: "Validate the input JSON file",
    args: true,
    params: [`JSON`],
    aliases: ["validate-json", "validation", "json-val"],
    usage: ">json [json]",
}
exports.help = {
    name: "json",
    category: "coding"
}