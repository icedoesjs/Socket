const { MessageEmbed } = require(`discord.js`);
const path = require('path');
const { readdirSync } = require('fs');
const langs = require(`../../resources/json/supportedLangs.json`);
exports.run = async(client, message, args) => {
    var itemRequested = false;
    if (args[1]) itemRequested = args[1].toLowerCase();
    if (args.length) {
        return callInput(client, message, args[0].toLowerCase(), itemRequested)
    } else {
        return callMenu(client, message);
    };

}

function callMenu(client, message) {
    let embed = new MessageEmbed();
    embed.setColor(client.config.embeds.color);
    let disTools = [];
    let codingTools = [];
    let misTools = [];
    let infoCmds = [];
    readdirSync(path.join(__dirname, `../`)).forEach(dir => {
        const cmds = readdirSync(path.join(__dirname, `../`, `${dir}`)).filter(f => f.endsWith('.js'));

        for (let file of cmds) {
            let info = require(`../${dir}/${file}`)
            if (info.help.name) {
                if (info.help.category.toLowerCase() === "discord") {
                    disTools.push(`‣ **${info.help.name}** - ${info.conf.description}`);
                } else if (info.help.category.toLowerCase() === "coding") {
                    codingTools.push(`‣ **${info.help.name}** - ${info.conf.description}`);
                } else if (info.help.category.toLowerCase() === "misc") {
                    misTools.push(`‣ **${info.help.name}** - ${info.conf.description}`);
                } else {
                    continue;
                }
            } else {
                continue;
            }
        }
    })

    infoCmds.push(`‣ **bug** - Submit a bug report`);
    infoCmds.push(`‣ **info** - View info about me`);

    embed.setAuthor(`Socket - The Programmer's Assistant`)
    embed.addField(`Discord Tools`, disTools.join("\n"));
    embed.addField(`Coding Tools`, codingTools.join("\n"));
    embed.addField(`Miscellanous Tools`, misTools.join("\n"));
    embed.addField(`Other`, infoCmds.join("\n"));
    embed.setFooter(`Showing ${disTools.length + codingTools.length + misTools.length + infoCmds.length} Commands in 4 Modules`)
    return message.channel.send(embed);
}

function callInput(client, message, input, item) {
    let embed = new MessageEmbed();
    embed.setColor(client.config.embeds.color);
    let cmdData = ``;
    var found = false;


    let runAliases = [
        "exec",
        "run",
        "eval",
        "execute",
        "evaluate"
    ];

    let runInfo = {
        "description": "Run code in various languages",
        "args": true,
        "params": ["LANGUAGE", "CODE"],
        "aliases": ["exec", "eval", "run", "execute", "evaluate"],
        "usage": ">run [lang] [code]",
        "additional": "Provide the code in code blocks",
        "languages": langs.run.join(", ")
    }
    readdirSync(path.join(__dirname, '../')).forEach(dir => {
        const cmds = readdirSync(path.join(__dirname, `../`, `${dir}`)).filter(f => f.endsWith('.js'));

        for (let file of cmds) {
            let info = require(`../${dir}/${file}`);

            if (info.help.name && info.conf.description) {
                if (info.help.name !== input) continue;
                if (info.help.name === input || info.conf.aliases.includes(input)) {
                    found = true;
                    if (item !== false) {
                        switch (item) {
                            case "description":
                                embed.setDescription(info.conf.description)
                                embed.setAuthor(`Description for ${input}`)
                                return message.channel.send(embed)
                            case "params":
                                embed.setAuthor(`Parameters for ${input}`)
                                if (info.conf.params.length !== 0) {
                                    embed.setDescription(info.conf.params.join(", "))
                                } else {
                                    embed.setDescription(`No parameters required for ${input}`)
                                }
                                return message.channel.send(embed)
                            case "aliases":
                                embed.setAuthor(`Aliases for ${input}`)
                                embed.setDescription(info.conf.aliases.join(" | "))
                                return message.channel.send(embed)
                            case "usage":
                                embed.setDescription(info.conf.usage)
                                embed.setAuthor(`Usage example for ${input}`)
                                return message.channel.send(embed)
                            case "additional":
                                embed.setAuthor(`Additional info for ${input}`)
                                if (info.conf.additional) {
                                    embed.setDescription(info.conf.additional)
                                } else {
                                    embed.setDescription(`No additonal text found.`)
                                }
                                return message.channel.send(embed)
                            case "languages":
                                embed.setAuthor(`Valid languages for ${input}`)
                                if (info.conf.languages) {
                                    embed.setDescription(info.conf.languages)
                                } else {
                                    embed.setDescription(`No languages needed.`)
                                }
                                return message.channel.send(embed)
                            default:
                                embed.setAuthor(`Invalid item used`)
                                embed.setDescription(`An item was provided but the item is not a valid one, view the valid items below\n\n- Description\n- Params\n- Aliases\n- Usage\n- Additional\n- Languages`)
                                return message.channel.send(embed)
                        }
                    }
                    cmdData += `**${info.conf.description}**\n`;
                    if (info.conf.args == true) {
                        cmdData += `\nArguments Required: **${info.conf.params.join(" | ")}**\n\n`;
                    }
                    cmdData += `Aliases: **${info.conf.aliases.join(", ")}**\n\n`;
                    if (info.conf.additional) {
                        cmdData += `Notes: **${info.conf.additional}**\n\n`
                    }
                    cmdData += `Usage: **${info.conf.usage}**`
                }
            } else {
                continue;
            }
        };
        if (found !== true && runAliases.includes(input)) {
            if (item !== false) {
                switch (item) {
                    case "description":
                        embed.setDescription(runInfo.description)
                        embed.setAuthor(`Description for ${input}`)
                        return message.channel.send(embed)
                    case "params":
                        embed.setAuthor(`Parameters for ${input}`)
                        embed.setDescription(runInfo.params.join(", "))
                        return message.channel.send(embed)
                    case "aliases":
                        embed.setAuthor(`Aliases for ${input}`)
                        embed.setDescription(runInfo.aliases.join(" | "))
                        return message.channel.send(embed)
                    case "usage":
                        embed.setDescription(runInfo.usage)
                        embed.setAuthor(`Usage example for ${input}`)
                        return message.channel.send(embed)
                    case "additional":
                        embed.setAuthor(`Additional info for ${input}`)
                        embed.setDescription(runInfo.additional)
                        return message.channel.send(embed)
                    case "languages":
                        embed.setAuthor(`Valid languages for ${input}`)
                        embed.setDescription(runInfo.languages)
                        return message.channel.send(embed)
                    default:
                        embed.setAuthor(`Invalid item used`)
                        embed.setDescription(`An item was provided but the item is not a valid one, view the valid items below\n\n- Description\n- Params\n- Aliases\n- Usage\n- Additional\n- Languages`)
                        return message.channel.send(embed)
                }
            }
            embed.setAuthor(`Information for ${input}`)
            embed.setDescription(`**${runInfo.description}**\n\nArguements Required: **${runInfo.args.join(" | ")}\n\nAliases: **${runInfo.aliases.join(", ")}\n\nNotes: ${runInfo.additional}\n\nUsage: **${runInfo.usage}**`);
            embed.setFooter(`Requsted by ${message.author.username}`);
            return message.channel.send(embed)
        }
        if (found == true) {
            embed.setAuthor(`Command Info for ${input}`)
            embed.setDescription(cmdData);
            embed.setFooter(`Requested by ${message.author.username}`)
            return message.channel.send(embed)
        } else {
            return message.channel.send(`⚠️ **No command found by name or alias ${input}**`).then(g => g.delete({ timeout: 10000 }));
        }
    })
}

exports.conf = {
    description: "See my commands or info about commands",
    args: false,
    params: [`COMMAND`],
    aliases: ["plzhelp", "hlp"],
    usage: ">help || >help [COMMAND] [ITEM]",
    additional: "Item is not required, if command is provided but no item, it will show all items, if an item is provided it will show said item\nItems: description, params, aliases, usage, additional, some have languages"
}
exports.help = {
    name: "help",
    category: "info"
}