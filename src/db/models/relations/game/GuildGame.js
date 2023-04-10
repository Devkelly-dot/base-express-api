const mongoose = require('mongoose');
const BaseModelSchema = require('../../base/Base');

// user - game relational 
const GuildGameModel = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'guild'
    },
    game: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'game'
    }
});

GuildGameModel.add(BaseModelSchema)
module.exports = mongoose.model('guildGame', GuildGameModel);