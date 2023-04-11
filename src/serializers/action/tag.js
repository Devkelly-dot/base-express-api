const {GetActionSerializer, GetOneSerializer, CreateActionSerializer, ConnectToMeSerializer, DisconnectFromMeSerializer, CreateMineSerializer} = require('./base');
const User = require("../../db/models/User");

const Tag = require("../../db/models/Tag");

const {getModelByField, getModelsByField} = require('../../utils/queries');

class TagGetSerializer extends GetOneSerializer {
    constructor() {
        super();
        this.model_name = "tag";
        this.filter_field = "id";
    }
}

class TagListSerializer extends GetActionSerializer {
    constructor() {
        super();
        this.model_name = "tag";
    }
}

class CreateTagSerializer extends CreateMineSerializer {
    constructor() {
        super();
        this.model_name = "tag";
        this.required_fields = ["displayName", "name", "user_id"];
        this.optional_fields = [];
        this.model = Tag;
        this.unique = true;
        this.unique_field = "name";
    }
};

module.exports = {
    TagGetSerializer: TagGetSerializer,
    TagListSerializer: TagListSerializer,
    CreateTagSerializer: CreateTagSerializer
  };