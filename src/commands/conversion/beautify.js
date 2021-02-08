const { MessageEmbed } = require(`discord.js`);
var Beautify = require('js-beautify');
const JsonBeautify = require('json-beautify');
const options = require(`../../resources/json/beautyOpts.json`);
const cssBeautify = require(`cssbeautify`);
const html = require('html').prettyPrint;
const xml = require(`xml-formatter`);
exports.run = async(client, message, args) => {

    if (!args[0] == "`" && args[1] !== "`" && args[2] !== "`") return message.channel.send(`⚠️ **The code must be provided inside a code block.**`).then(h => h.delete({ timeout: 10000 }));

    var JSONVal = args.join(" ").replace("```", "");
    var code = JSONVal.replace("```", "");

    if (code.startsWith("{")) {
        var jsonDone = await JsonBeautify(code, null, 2, 100);
        return message.channel.send(`${message.member}, Here's your **JSON** but pretty\n` + "```" + "json\n" + jsonDone + "```");

    } else if (code.startsWith("body {")) {
        var cssDone = await cssBeautify(code, {
            indet: "  ",
            openbrace: 'separate-line',
            autosemicolon: true
        });
        return message.channel.send(`${message.member}, Here's your **CSS** but pretty\n` + "```" + "css\n" + cssDone + "```");

    } else if (code.startsWith("<!DOCTYPE html>")) {

        var htmlDone = await html(code);
        return message.channel.send(`${message.member}, Here's your **HTML** but pretty\n` + "```" + "html\n" + htmlDone + "```");
    } else if (code.startsWith("<root>")) {
        var xmlDone = xml(code);
        return message.channel.send(`${message.member}, Here's your **XML** but pretty\n` + "```" + "xml\n" + xmlDone + "```");

    } else {
        let codeDone = await Beautify(code, options)

        return message.channel.send(`${message.member}, Here's your **code** but pretty\n` + "```" + "js\n" + codeDone + "```");
    }


}

exports.conf = {
    description: "Make code or jsons pretty again",
    args: true,
    params: [`CODE`],
    aliases: ["pretty", "format"],
    usage: ">beautify [JS/JSON/CSS/HTML/XML]",
    additional: "Provide the JS, json, xml, html or css input inside a code block.\nCSS must start with the body element\nHTML must start with <!DOCTYPE html>\nXML must start with the root tag",
    languages: "Javascript, JSON,XML, HTML, CSS"
}
exports.help = {
    name: "beautify",
    category: "coding"
}