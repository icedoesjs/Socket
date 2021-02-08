if (Number(process.version.slice(1).split(".")[0] < 12)) throw new Error(`Node.js 12.0 or higher is required to run me!`);
const { Client, Collection, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

class SocketClient extends Client {
    constructor(options) {
        super(options);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.config = require(`../../config`);
        this.wait = require('util').promisify(setTimeout);
        this.console = require(`./Logger.js`)

        this.awaitMessage = async(message, text, limit = 60000) => {
            const filter = m => m.author.id === message.author.id;
            await message.channel.send(text);
            try {
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
                return collected.first().content;
            } catch (e) {
                return undefined;
            }
        }


        this.invalidUsage = async(message, er) => {
            let embed = new MessageEmbed()
                .setAuthor(`Invalid Arguements Provided`)
                .setColor(this.config.embeds.color)
                .setDescription("``" + er + "``" + ` was not provided when using the command, check **${this.config.prefix}help [command]** for more information on usage.`)
                .setFooter(`Scratch, Made by IceyyM8`)
            return message.channel.send(embed).then(i => i.delete({ timeout: 5000 }));
        }

        this.embedFooter = async() => {
            return client.config.embeds.footers[Math.floor(Math.random * client.config.embeds.footers.length)]; // Returns random footer
        }
    }
}

const client = new SocketClient();

const init = async() => {
    let cLoaded = 0;
    readdirSync(join(__dirname, `../`, 'commands')).forEach(dir => {
        const commands = readdirSync(join(__dirname, `../`, `commands/`, `${dir}`)).filter(f => f.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.help.name) {
                client.commands.set(pull.help.name, pull)
                cLoaded++;
            } else {
                continue;
            }
        }
    })

    const events = await readdirSync(join(__dirname, `../`, 'events'))
    let eLoaded = 0;
    events.forEach(e => {
        const name = e.split('.')[0];
        eLoaded++;
        const event = require(`../events/${e}`)
        client.on(name, event.bind(null, client));
        delete require.cache[require.resolve(`../events/${e}`)]
    });


    // Event Handlers not used in file handler
    client.on('disconnect', () => client.console.log(`Connection lost, attempting to reconnect.`));
    client.on('error', e => client.console.log(e, "error"));
    client.on(`warn`, w => client.console.log(w, "warn"));

    require(`./Connections`)(client);
    client.login(client.config.token).catch(e => console.log(`Failed to login [${e}]`))
    client.console.log(`Intialized ${eLoaded} events & ${cLoaded} commands`);

}

exports.init = init;