const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');

const GameModel = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    displayName: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    platform: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'platform'
    }
});

GameModel.add(BaseModelSchema)
module.exports = mongoose.model('platform', GameModel);