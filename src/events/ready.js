module.exports = async client => {
    setTimeout(() => {

        //let activitiesFixed = client.config.status.activities.replace(`{prefix}`, client.config.prefix).replace(`{members}`, client.users.cache.size).replace(`{guilds}`, client.guilds.cache.size);

        //let getActivity = Math.floor(Math.random() * (activitiesFixed - 1) + 1);

        client.console.log(`Client logged in as ${client.user.tag}`, "ready")
        client.console.log(`Serving ${client.guilds.cache.size} guilds & ${client.users.cache.size} users`, "ready")

        client.user.setPresence({
            activity: {
                type: "WATCHING",
                name: `for ${client.config.prefix}help`
            },
            status: client.config.status.presence.toLowerCase()
        }, 2000)
    })
}