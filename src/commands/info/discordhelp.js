const { MessageEmbed } = require(`discord.js`);
var devDiscord = require(`../../resources/json/devDiscord.json`);
var feat = `Discord tagged by our development team that are either ours or super useful.\n\n`;
var js = `Discord guilds whose main topic is javascript, be it web development or other.\n\n`;
var c = `C# Discord Guilds which focus solely on C# Development.\n\n`;
var cpp = `C++ Guilds whose main focus is to cater to CPP support or chat.\n\n`;
var py = `Discords whose main focus is Python.\n\n`;
var java = `Discord servers which focus on Java, whether it be minecraft or other uses.\n\n`;
var html = `HTML/Web Development Discords who assist in HTML.\n\n`;
var lua = `LUA Discords who focus on Roblox or other game engines.\n\n`;
var ts = `TypeScript/JS Discords who cater to both, mainly assisting in TS.\n\n`;
var rust = `Discords who assist in the Rust programming lang.\n\n`;
var go = `GO Discords which have a community of Golang developers.\n\n`;
var swift = `Discord which focus mainly on Swift and iOS Development.\n\n`;
var allAround = `Guilds which support mutiple langs and applications of those langs.\n\n`;

Object.entries(devDiscord.featured).forEach(e => {
    feat += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.javascript).forEach(e => {
    js += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord["c#"]).forEach(e => {
    c += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord["c++"]).forEach(e => {
    cpp += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.python).forEach(e => {
    py += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.java).forEach(e => {
    java += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.html).forEach(e => {
    html += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.lua).forEach(e => {
    lua += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.ts).forEach(e => {
    ts += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.rust).forEach(e => {
    rust += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.go).forEach(e => {
    go += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.swift).forEach(e => {
    swift += `[${e[0]}](${e[1]})\n`
})

Object.entries(devDiscord.all).forEach(e => {
    allAround += `[${e[0]}](${e[1]})\n`
})


let pages = [feat, js, c, cpp, py, java, html, ts, lua, rust, go, swift, allAround];

exports.run = async(client, message, args) => {

    if (args.length) callModule(client, message, args[0].toLowerCase())
    else {

        let embed = new MessageEmbed()
        embed.setColor(client.config.embeds.color)
        let titles = [`Featured Development Discords`, `Javascript Discords`, `C# Discords`, `C++ Discords`, `Python Discords`, `Java Discords`, `HTML/WEB Discords`, `TypeScript Discords`, `Lua Discords`, `Rust Discords`, `GO Discords`, `Swift/iOS Discords`, `Discords supporting mutiple langs`]

        let page = 1;
        embed.setDescription(pages[page - 1]);
        embed.setAuthor(titles[page - 1]);


        message.channel.send(embed).then(async(m) => {
            m.react(`⬅️`).then(async(r) => {
                await m.react(`❌`);
                await m.react(`➡️`);
                const removeReaction = async(m, msg, emoji) => { try { m.reactions.cache.find(r => r.emoji.name == emoji).users.remove(message.author.id); } catch (err) {} };

                const back = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
                const forward = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;
                const close = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

                const backwards = m.createReactionCollector(back, { time: 60000 });
                const forwards = m.createReactionCollector(forward, { time: 60000 });
                const closer = m.createReactionCollector(close, { time: 60000 });

                backwards.on('collect', async(r) => {
                    await removeReaction(m, message, '⬅️')
                    if (page === 1) return;
                    page--;
                    embed.setAuthor(titles[page - 1])
                    embed.setDescription(pages[page - 1])
                    embed.setFooter(`Viewing page ${page} of ${pages.length}`)
                    m.edit(embed)
                });

                forwards.on(`collect`, async(r) => {
                    await removeReaction(m, message, '➡️')
                    if (page === pages.length) return;
                    page++;
                    embed.setAuthor(titles[page - 1])
                    embed.setDescription(pages[page - 1])
                    embed.setFooter(`Viewing page ${page} of ${pages.length}`)
                    m.edit(embed)
                });

                closer.on('collect', r => {
                    m.delete()
                })

            })
        })
    }
}

async function callModule(client, message, input) {
    let embed = new MessageEmbed()
    embed.setColor(client.config.embeds.color)
    if (input == "featured" || input == "feat") {
        embed.setDescription(feat)
        embed.setAuthor(`Featured Discords`)
    } else if (input == "js" || input == "javascript") {
        embed.setDescription(js);
        embed.setAuthor(`JavaScript Discords`)
    } else if (input == "c#" || input == "csharp") {
        embed.setDescription(c)
        embed.setAuthor(`C# Discords`);
    } else if (input == "cpp" || input == "c++") {
        embed.setDescription(cpp)
        embed.setAuthor(`C++ Discords`)
    } else if (input == "py" || input == "python") {
        embed.setDescription(py)
        embed.setAuthor(`Python Discords`)
    } else if (input == "java") {
        embed.setDescription(java)
        embed.setAuthor(`Java Discords`)
    } else if (input == "html") {
        embed.setDescription(html)
        embed.setAuthor(`HTML/WEB Discords`)
    } else if (input == "ts" || input == "typescript") {
        embed.setDescription(ts)
        embed.setDescription(`TypeScript Discords`)
    } else if (input == "lua") {
        embed.setDescription(lua)
        embed.setAuthor(`LUA Discords`)
    } else if (input == "rust") {
        embed.setDescription(rust)
        embed.setAuthor(`Rust Discords`)
    } else if (input == "go" || input == "golang") {
        embed.setDescription(go)
        embed.setAuthor(`GO Discords`)
    } else if (input == "swift") {
        embed.setDescription(swift)
        embed.setAuthor(`Swift Discords`)
    } else if (input == "dev" || input == "development") {
        embed.setAuthor(`Development Discords`);
        embed.setDescription(allAround)
    } else {
        return message.channel.send(`🛑 **The keyword provided is invalid, to see keywords try ${client.config.prefix}help discords**`)
    }

    return message.channel.send(embed)
}



exports.conf = {
    description: "See the most popular discords associated with coding languages",
    args: false,
    params: [`LANG`],
    aliases: ["discordhelp", "hangouts", "lounges"],
    usage: ">discords",
}
exports.help = {
    name: "discords",
    category: "discord"
}