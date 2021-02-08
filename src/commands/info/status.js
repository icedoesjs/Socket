const { MessageEmbed } = require("discord.js");
const fetch = require(`node-fetch`);
const { key } = require("stackexchange/lib/config");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed();
    embed.setColor(client.config.embeds.color);

    let keyword = args[0].toLowerCase();

    if (keyword == "discord") {
        await fetch(`https://srhpyqt94yxb.statuspage.io/api/v2/summary.json`).then(async(res) => {
            res.json().then(r => {
                let com = ``;
                embed.setTitle(`All discord service statuses`)
                embed.setURL(`https://discordstatus.com`)
                embed.setColor(`GREEN`)
                r.components.forEach(c => {
                    if (c.status == "operational") {
                        var desc = `Region based ${c.name} server`;
                        if (c.description !== null) {
                            desc = c.description.split(",")[0];
                        }
                        if (c.name == "CloudFlare") {
                            desc = "The DDOS protection proxy";
                        }
                        com += `🟢 **${c.name}** - ${desc}\n`
                        desc = ``;
                    } else {
                        embed.setColor(`YELLOW`)
                        var desc = `Region based ${c.name} server`;
                        if (c.description !== null) {
                            desc = c.description.split(",")[0];
                        }
                        if (c.name == "CloudFlare") {
                            desc == "The DDOS protection proxy";
                        }
                        com += `🟡 **${c.name}** - ${c.description}`;
                        desc = ``;
                    }
                })
                embed.setDescription(com)
                return message.channel.send(embed)
            })
        })
    } else if (keyword == "github") {
        await fetch(`https://kctbh9vrtdwd.statuspage.io/api/v2/summary.json`).then(async(res) => {
            res.json().then(r => {
                let com = ``;
                embed.setTitle(`All github service statuses`)
                embed.setURL(`https://www.githubstatus.com`)
                embed.setColor(`GREEN`)
                r.components.forEach(c => {
                    if (c.status == "operational") {
                        var desc = `No description provided`;
                        if (c.description !== null) {
                            desc = c.description.split(",")[0];
                        }
                        if (c.name == "Visit www.githubstatus.com for more information") return;
                        com += `🟢 **${c.name}** - ${desc}\n`
                        desc = ``;
                    } else {
                        embed.setColor(`YELLOW`)
                        var desc = `No description provided`;
                        if (c.description !== null) {
                            desc = c.description.split(",")[0];
                        }
                        if (c.name == "Visit www.githubstatus.com for more information") return;
                        com += `🟡 **${c.name}** - ${c.description}`;
                        desc = ``;
                    }
                })
                embed.setDescription(com)
                return message.channel.send(embed)
            })
        })
    }
}

exports.conf = {
    description: "Get service statuses for popular developer websites",
    args: true,
    params: [`SITE`],
    aliases: ["statuses", "online"],
    usage: ">status [SITE]",
    additional: "Keywords: discord, github"
}
exports.help = {
    name: "status",
    category: "coding"
}