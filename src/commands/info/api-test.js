const fetch = require('node-fetch');
const { writeFile, unlink } = require('fs');
exports.run = async(client, message, args) => {

    let URL = args[0].toLowerCase();
    fetch(URL).then(data => {
        if (data.size == 0) { return message.channel.send(`⚠️ **The API returned an invalid response.**`) }
        if (!data.ok) { return message.channel.send(`⚠️ **The API returned an invalid response.**`) }
        data.json().then(txt => {
            writeFile(`GET-${message.author.id}.txt`, JSON.stringify(txt), async function(err, data) {
                await message.channel.send(`✅ **The API returned data, the data is provided in the file below to avoid discord's limits.** `, { files: [`GET-${message.author.id}.txt`] });
                return unlink(`GET-${message.author.id}.txt`, (err) => {
                    if (err) {
                        return client.console.log(`Failed to remove API GET File, file name: GET-${message.author.id}.txt`);
                    } else {
                        return;
                    }
                })
            })
        })
    }).catch(error => {
        error.text().then(e => {
            console.log(e)
        })
    })
}

exports.conf = {
    description: "Send a test call to a GET api",
    args: true,
    params: [`URL`],
    aliases: ["api-call", "GET"],
    usage: ">api [URL]",
}
exports.help = {
    name: "api",
    category: "coding"
}