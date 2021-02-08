module.exports = async(client, message) => {
    if (!message.content.startsWith(client.config.prefix)) return;
    if (message.author.bot) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();

    if (message.guild && !message.guild.me.hasPermission("SEND_MESSAGES")) return;

    const atHelp = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(atHelp)) {
        return message.channel.send(`**Hi im scratch, a programmer's assistant, I'm a WIP but check me out using ${client.config.prefix}help**`)
    }
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(command))
    if (!cmd) return;
    if (cmd.conf.enabled == false) return;
    if (cmd.conf.args == true && !args.length) return message.channel.send(`🛑 **Arguements are required to run this, check usage in the help by doing ${client.config.prefix}help usage [command]**`).then(del => del.delete({ timeout: 10000 }));

    try {
        await cmd.run(client, message, args)
    } catch (e) {
        client.console.log(`Failed to run ${command} for ${message.guild.id}\n${e}`)
        return message.channel.send(`⚠️ **That command failed to run, this has been logged to be fixed, in the mean time make sure your arguements are correct.**`).then(del => del.delete({ timeout: 10000 }))
    }
}