const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    channelID: String,
    repo: String,
    guildId: String
})

module.exports = mongoose.model('Follows', followSchema);