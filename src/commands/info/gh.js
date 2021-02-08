const { MessageEmbed } = require("discord.js");
const fetch = require(`node-fetch`);
const moment = require('moment');
var lim = 0;
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed();
    embed.setColor(client.config.embeds.color)
    const querURL = `https://api.github.com`;
    let actions = args[0].toLowerCase()

    if (actions == "repo") {
        let term = args.slice(1).join("+");
        await fetch(querURL + "/search" + `/repositories?q=${term}&sort=stars&order=desc`).then(res => {
            res.json().then(r => {
                embed.setAuthor(`Search results for ${term}`)

                if (r.total_count === 0) {
                    return message.channel.send(`🛑 **No results for ${term}**`)
                }

                Object.values(r).forEach(v => {
                    Object.values(v).forEach(d => {
                        if (lim == 10) return;
                        if (lim == r.total_count - 1) {
                            return message.channel.send(embed)
                        }
                        embed.addField(`${d.name} by ${d.owner.login}`, `${d.description}\n[View source code](${d.url}) (${d.language || "Mutiple Langs"})`);
                        lim++
                    })
                })
                return message.channel.send(embed)
            })
        })

    } else if (actions == "user") {
        let terms = args.slice(1).join("+");

        await fetch(querURL + "/users/" + `${terms}`).then(res => {
            res.json().then(r => {
                embed.setTitle(`User information for ${r.login}`)
                embed.setURL(r.url)
                embed.setThumbnail(r.avatar_url)
                let bio = ``;


                bio += `${r.bio}\n\n[View repos](${r.repos_url}) | [View Following](${r.following_url}) | [View Followers](${r.followers_url})\n`;

                if (r.blog !== null || r.twitter_username !== null) {
                    bio += `[View ${r.login}'s website](${r.blog}) | [View ${r.login}'s Twitter](https://twitter.com/${r.twitter_username})\n\n`
                }


                embed.addField(`User Stats`, `Public Repos: **${r.public_repos}**\nFollowers: **${r.followers}**\nFollowing: **${r.following}**`, true)
                embed.addField(`User info`, `📍 ${r.location || "No location set"}\n🏢 ${r.company || "No company set"}\n🧍 ${r.name || "No name set"}`, true)

                embed.setDescription(bio)

                let dateISO = r.created_at.split("T")[0]

                var ago = moment(dateISO).fromNow()


                embed.setFooter(`${r.login}'s account was created ${ago}!`)

                return message.channel.send(embed)
            })
        })

        if (!terms || terms.length == 0) {
            return message.channel.send(`🛑 **You must provide a term to search after the action, aka the username**`).then(del => del.delete({ timout: 10000 }));

        }
    } else {
        return message.channel.send(`⚠️ **The keyword provided didnt match useable ones, check ${client.config.prefix}help gh, for more info and keyword**`).then(u => u.delete({ timeout: 10000 }));
    }



}

exports.conf = {
    description: "Search github users and repos",
    args: true,
    params: [`KEYWORD`, `QUERY`],
    aliases: ["github", "gh-search", "git-search"],
    usage: ">gh [keyword] [query]",
    additional: "Keywords: user, repo\nUser - Allows you to search for a user\nRepo - Allows you to search for a repo"
}
exports.help = {
    name: "gh",
    category: "misc"
}