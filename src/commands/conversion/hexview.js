const { MessageEmbed, MessageAttachment } = require(`discord.js`);
const Canvas = require('canvas');
const { join } = require('path');
exports.run = async(client, message, args) => {

    if (!args[0].startsWith("#")) {
        return message.channel.send(`🛑 **That is not a valid hex, a hex should start with #**`).then(i => i.delete({ timeout: 10000 }));
    }

    if (verifyHex(args[0]) != true) {
        return message.channel.send(`🛑 **You provided an invalid hex color code.**`).then(i => i.delete({ timeout: 10000 }));
    }

    Canvas.registerFont(join(__dirname, `../`, `../`, `resources/`, 'fonts/', 'micross.ttf'), { family: "sans-seriff" })
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const back = await Canvas.loadImage(join(__dirname, `../`, `../`, `resources/`, 'img', 'blank.jpg'));
    ctx.drawImage(back, 0, 0, canvas.width, canvas.height)
    ctx.font = "80px sans-seriff";
    ctx.fillStyle = args[0];
    ctx.fillText(args[0], canvas.width / 2.5, canvas.height / 1.5);
    const image = new MessageAttachment(canvas.toBuffer(), "view.png");
    let embed = new MessageEmbed().attachFiles(image).setImage('attachment://view.png')
    embed.setAuthor(`Hex Visualizer`)
    embed.setColor(args[0])
    embed.setDescription(`You requested to visualize **${args[0]}**`);
    return message.channel.send(embed)

}

exports.conf = {
    description: "Visualize the inputted hex color",
    args: true,
    params: [`HEX`],
    aliases: ["color", "hex"],
    usage: ">color [HEX]",
}
exports.help = {
    name: "color",
    category: "misc"
}

function verifyHex(input) {
    var val = /[0-9A-Fa-f]{6}/g;

    if (val.test(input)) {
        val.lastIndex = 0;
        return true;
    } else {
        val.lastIndex = 0;
        return false;
    }

}