const mongoose = require('mongoose');
const BaseModelSchema = require('../../base/Base');
// user - guild relational 
const MembershipModel = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    guild: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'guild'
    }
});

MembershipModel.add(BaseModelSchema)
module.exports = mongoose.model('membership', MembershipModel);