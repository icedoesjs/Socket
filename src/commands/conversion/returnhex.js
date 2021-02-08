const { MessageEmbed, MessageAttachment } = require(`discord.js`);
const Canvas = require('canvas');
const { join } = require('path');
exports.run = async(client, message, args) => {

    var freeHexValue = Math.floor(Math.random() * 16777215).toString(16);

    Canvas.registerFont(join(__dirname, `../`, `../`, `resources/`, 'fonts/', 'micross.ttf'), { family: "sans-seriff" })
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const back = await Canvas.loadImage(join(__dirname, `../`, `../`, `resources/`, 'img', 'blank.jpg'));
    ctx.drawImage(back, 0, 0, canvas.width, canvas.height)
    ctx.font = "80px sans-seriff";
    ctx.fillStyle = "#" + freeHexValue
    ctx.fillText("#" + freeHexValue, canvas.width / 2.5, canvas.height / 1.5);
    const image = new MessageAttachment(canvas.toBuffer(), "view.png");
    let embed = new MessageEmbed().attachFiles(image).setImage('attachment://view.png')
    embed.setAuthor(`Random Hex Color`)
    embed.setColor(freeHexValue)
    embed.setDescription(`The system generated **#${freeHexValue}**`);
    return message.channel.send(embed)

}

exports.conf = {
    description: "Gather a random color",
    args: false,
    params: [`STRING`],
    aliases: ["freehex", "randomcolor", "free-color"],
    usage: ">random-hex",
}
exports.help = {
    name: "random-hex",
    category: "misc"
}