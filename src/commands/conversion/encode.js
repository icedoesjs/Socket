const { MessageEmbed } = require(`discord.js`);
const CryptoJS = require('crypto-js');
exports.run = async(client, message, args) => {

    let embed = new MessageEmbed()
    embed.setColor(client.config.embeds.color)
    var method = 1
    var methodInvoked = false;

    if (args[0].toLowerCase == "base64") {
        method = 1
        methodInvoked = true;
    } else if (args[0].toLowerCase() == 'aes') {
        method = 2;
        methodInvoked = true;
    } else if (args[0].toLowerCase() == "sha1") {
        method = 3
        methodInvoked = true;
    } else if (args[0].toLowerCase() == "hex") {
        method = 4;
        methodInvoked = true;
    } else if (args[0].toLowerCase() == "md5") {
        method = 5;
        methodInvoked = true;
    }

    if (!methodInvoked) {

        const data = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(args.join(" ")))

        embed.setAuthor(`String to Base 64 Encoding`)
        embed.addField(`Input`, args.join(" "))
        embed.addField(`Output`, data)
        return message.channel.send(embed)
    }

    if (methodInvoked == true && method == 1) {

        const data = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(args.slice(1).join(" ")))

        embed.setAuthor(`String to Base 64 Encoding`)
        embed.addField(`Input`, args.slice(1).join(" "))
        embed.addField(`Output`, data)
        return message.channel.send(embed)

    } else if (methodInvoked == true && method == 2) {
        const passPhrase = '123';
        const data = CryptoJS.AES.encrypt(args.slice(1).join(" "), passPhrase).toString();

        embed.setAuthor(`String to AES Encoding`)
        embed.addField(`Input`, args.slice(1).join(" "))
        embed.addField(`Output`, data)
        return message.channel.send(embed)
    } else if (methodInvoked == true && method == 3) {
        var hash = CryptoJS.SHA1(args.slice(1).join(" "));
        embed.setAuthor(`String to SHA1 Encoding`)
        embed.addField(`Input`, args.slice(1).join(" "))
        embed.addField(`Output`, hash)
        return message.channel.send(embed)
    } else if (methodInvoked == true && method == 4) {
        var data = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(args.slice(1).join(" "))).toString();

        embed.setAuthor(`String to HEX Encoding`)
        embed.addField(`Input`, args.slice(1).join(" "))
        embed.addField(`Output`, data)
        return message.channel.send(embed)
    } else if (methodInvoked == true && method == 5) {

        var hash = CryptoJS.MD5(args.slice(1).join(" "))

        embed.setAuthor(`String to MD5 Encoding`)
        embed.addField(`Input`, args.slice(1).join(" "))
        embed.addField(`Output`, hash)
        return message.channel.send(embed)
    } else {
        const data = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(args.join(" ")))

        embed.setAuthor(`String to Base 64 Encoding`)
        embed.addField(`Input`, args.join(" "))
        embed.addField(`Output`, data)
        return message.channel.send(embed)
    }


}

exports.conf = {
    description: "Encode a string to a chosen type of encoding",
    args: true,
    params: [`STRING`],
    aliases: ["enco", "hash", "encrypt"],
    usage: ">encode {method} [string]",
    additional: "Methods: base64, aes, hex, sha1, md5\nNotes: If no method is provided the system will use BASE64"
}
exports.help = {
    name: "encode",
    category: "coding"
}