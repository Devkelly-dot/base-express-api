const mongoose = require('mongoose');
const BaseModelSchema = require('../../base/Base');

// user - game relational 
const GameOwnershipModel = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    game: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'game'
    }
});

GameOwnershipModel.add(BaseModelSchema)
module.exports = mongoose.model('gameOwnership', GameOwnershipModel);