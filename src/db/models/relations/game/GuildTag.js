const mongoose = require('mongoose');
const BaseModelSchema = require('../../base/Base');


const GuildTagModel = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'tag'
    },
    game: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'guild'
    }
});

GuildTagModel.add(BaseModelSchema)
module.exports = mongoose.model('guildTag', GuildTagModel);