const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');

const UserModel = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
});

UserModel.add(BaseModelSchema)
module.exports = mongoose.model('user', UserModel);