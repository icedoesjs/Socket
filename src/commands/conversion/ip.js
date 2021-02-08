const { MessageEmbed, MessageAttachment } = require(`discord.js`);
const axios = require('axios');
const qs = require('querystring');
exports.run = async(client, message, args) => {


    if (!args[0].includes("https://") || !args[0].includes("https://") || !args[0].includes("www.")) {
        return message.channel.send(`🛑 **Please provide a valid link**`).then(i => i.delete({ timeout: 10000 }));
    }

    const scan = async function(url) {
        const api = "https://www.psafe.com/dfndr-lab/wp-content/themes/tonykuehn/inc/url_api_v2.php";
        const body = qs.stringify({
            action: 'url_check',
            url: url
        })

        const head = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            const res = await axios.post(api, body, head);
            return res.data;
        } catch (e) {
            return null;
        }
    }

    scan(args[0]).then(async(res) => {
        if (res.modal == "results_modal_safe") {
            return message.channel.send(`✅ **The provided link seems to be safe.**`)
        } else if (res.modal == "results_modal_malicious") {
            await message.delete();
            return message.channel.send(`❌ **The provided link was detcted as malicious**`);
        } else if (res.modal == "results_modal_fail") {
            await message.delete();
            return message.channel.send(`⚠️ **I failed to analyze the provided link.**`);
        } else {
            await message.delete();
            return message.channel.send(`⚠️ **I failed to analyze the provided link.**`);
        }
    })



}

exports.conf = {
    description: "Check the link to make sure it's safre",
    args: true,
    params: [`LINK`],
    aliases: ["malicious"],
    usage: ">check [LINK]",
}
exports.help = {
    name: "check",
    category: "misc"
}