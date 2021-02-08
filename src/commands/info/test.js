const { MessageEmbed } = require(`discord.js`);
const { createWriteStream, writeFile, appendFile } = require('fs');
const { join } = require('path');
const http = require('http');
exports.run = async(client, message, args) => {

    let data = message.attachments.map(x => x);
    let file = writeFile(join(__dirname, '../', '../', '../', 'src/', 'resources/', 'queries/', `sql-${message.author.id}.txt`), 'PLACEHOLDER', function(err) {
        if (err) throw err;
        let url = data[0].proxyURL.replace("https", "http");
        http.get(url, function(res) {
            res.pipe(file)

            res.on('data', (d) => console.log(d))
        });
})
}

exports.conf = {
    description: "Run code in various languages",
    args: false,
    params: ["LANGUAGE", "CODE"],
    aliases: ["eval", "run", "execute", "evaluate"],
    usage: ">run [lang] [code]",
    additional: "Provide the code in code blocks",
    languages: "https://tio.run/#"
}
exports.help = {
    name: "test",
    category: "coding"
}