const { MessageEmbed } = require(`discord.js`);
exports.run = async(client, message, args) => {
    if (!args[1]) {
        return message.channel.send(`🛑 **You did not provide any code to execute, please be aware the code must be in code blocks.**`).then(y => y.delete({ timeout: 10000 }));
    } else {
        return;
    }
}

exports.conf = {
    description: "Run code in various languages",
    args: true,
    params: ["LANGUAGE", "CODE"],
    aliases: ["eval", "run", "execute", "evaluate"],
    usage: ">run [lang] [code]",
    additional: "Provide the code in code blocks",
    languages: "https://tio.run/#"
}
exports.help = {
    name: "exec",
    category: "coding"
}