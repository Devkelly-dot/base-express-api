const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');

const PlatformModel = new mongoose.Schema({
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

PlatformModel.add(BaseModelSchema)
module.exports = mongoose.model('platform', PlatformModel);