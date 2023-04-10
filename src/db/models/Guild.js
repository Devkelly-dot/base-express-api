const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');

const GuildModel = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    displayName: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    }
});

GuildModel.add(BaseModelSchema)
module.exports = mongoose.model('guild', GuildModel);