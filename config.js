const { token } = require(`./global-settings.json`);
const config = {
    "token": token,
    "prefix": ">",
    "status": {
        "presence": "dnd",
        "activities": ["for {prefix}", "{members} users & {guilds} guilds.", "In Development"]
    },
    "embeds": {
        "color": "#1055d3",
        "footers": ["Socket - Made By IceyyM8", "Socket - Made with :heart:", "Socket - The development assistant"],
    },
    "database": "MONGODB LINK",
    "APIPort": "80",
    "stackKey": "STACK-OVERFLOW KEY",
    "RTDKey": "Read the docs KEY",
    "usePyClient": false,
    "index": "Welcome to Socket, the programmers assistant, take a look around and check out my various commands.",
    "info": ["About Me;👋 Hello I'm Socket, I was made to help the programming community with useful tools and tips.", "My Creator;My author and maintiner is **IceyyM8#0816**.", "Development;Socket uses a child process Python script to carry out various actions.", "Bug Reports;To open a bug report simply run **>bug** and it will submit it straight to me."],
    "update": "1.6.56;12/13/2020",
    "logo": "https://i.imgur.com/lX8eBwb.png"
}

module.exports = config;