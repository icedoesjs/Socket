const mongoose = require('mongoose');

module.exports = async(client) => {
    mongoose.connect(client.config.database, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }, err => {
        if (err) return console.log(`Failed to login to the Mongo DB.\n${err}`)
        if (!err) return client.console.log(`Intiliazed MongoDB\n`, "ready")
    })
}