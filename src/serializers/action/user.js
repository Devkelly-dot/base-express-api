const {GetActionSerializer, GetOneSerializer, GetMineSerializer, CreateActionSerializer} = require('./base');
const Platform = require("../../db/models/Platform");
const PlatformOwnership = require("../../db/models/relations/platform/PlatformOwnership");

const User = require("../../db/models/User");

const Guild = require("../../db/models/Guild");
const Membership = require("../../db/models/relations/User/Membership");

class UserGetSerializer extends GetOneSerializer {
    constructor() {
        super();
        this.model_name = "user";
        this.filter_field = "id";
    }
}

class UserListSerializer extends GetActionSerializer {
    constructor() {
        super();
        this.model_name = "user";
    }
}

class CreateUserSerializer extends CreateActionSerializer {
    constructor() {
        super();
        this.model_name = "user";
        this.required_fields = ["name"];
        this.optional_fields = ["platform"];
    }
};

class ListUserPlatformsSerializer extends GetMineSerializer {
    constructor() {
        super();
        this.model_name = "platform";
        this.match_field = "id";
        this.model = Platform;
        this.relation_model = PlatformOwnership;
        this.connected_model = User;
        this.connected_model_body_field = "user_id";
        this.connected_model_name = 'user';
    }
};

class ListUserGuildOwnedSerializer extends GetMineSerializer {
    constructor() {
        super();
        this.model_name = "owned_guilds";
        this.match_field = "id";
        this.model = Guild;
        this.connected_model = User;
        this.connected_model_body_field = "user_id";
        this.connected_model_name = 'user';
    }
};

class ListUserGuildJoinedSerializer extends GetMineSerializer {
    constructor() {
        super();
        this.model_name = "guild";
        this.match_field = "id";
        this.model = Guild;
        this.relation_model = Membership;
        this.connected_model = User;
        this.connected_model_body_field = "user_id";
        this.connected_model_name = 'user';
    }
};

module.exports = {
    UserGetSerializer: UserGetSerializer,
    UserListSerializer: UserListSerializer,
    ListUserPlatformsSerializer: ListUserPlatformsSerializer,
    CreateUserSerializer: CreateUserSerializer,
    ListUserGuildOwnedSerializer: ListUserGuildOwnedSerializer,
    ListUserGuildJoinedSerializer: ListUserGuildJoinedSerializer
  };