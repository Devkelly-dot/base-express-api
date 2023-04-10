const mongoose = require('mongoose');
const BaseModelSchema = require('../../base/Base');


const PlatformOwnershipModel = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    platform: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'platform'
    }
});

PlatformOwnershipModel.add(BaseModelSchema)
module.exports = mongoose.model('platformOwnership', PlatformOwnershipModel);