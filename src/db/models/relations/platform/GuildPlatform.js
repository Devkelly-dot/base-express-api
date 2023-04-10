const mongoose = require('mongoose');
const BaseModelSchema = require('../../base/Base');

// Guild - platform relational
const GuildPlatformModel = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'guild'
    },
    game: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'platform'
    }
});

GuildPlatformModel.add(BaseModelSchema)
module.exports = mongoose.model('guildPlatform', GuildPlatformModel);