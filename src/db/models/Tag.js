const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');

const TagModel = new mongoose.Schema({
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

TagModel.add(BaseModelSchema)
module.exports = mongoose.model('tag', TagModel);