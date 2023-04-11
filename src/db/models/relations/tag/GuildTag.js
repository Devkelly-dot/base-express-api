const mongoose = require('mongoose');
const BaseModelSchema = require('../../base/Base');

// Guild - platform relational
const GuildTagModel = new mongoose.Schema({
    guild: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'guild'
    },
    tag: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'tag'
    }
});

GuildTagModel.add(BaseModelSchema)
module.exports = mongoose.model('guildTag', GuildTagModel);