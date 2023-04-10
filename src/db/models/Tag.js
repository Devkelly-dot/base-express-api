const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');

const Tag = new mongoose.Schema({
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

Tag.add(BaseModelSchema)
module.exports = mongoose.model('tag', PlatformModel);