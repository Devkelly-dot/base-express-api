const BaseController = require('./base'); 
const {UserGetSerializer, UserListSerializer, ListUserPlatformsSerializer, CreateUserSerializer, ListUserGuildJoinedSerializer} = require('../serializers/action/user');
const UserOutputSerializer = require('../serializers/output/user');
const PlatformOutputSerializer = require('../serializers/output/platform');
const GuildOutputSerializer = require('../serializers/output/guild');

class GetUserController extends BaseController {
    constructor(){
        super();
        this.model_name = 'user';
        this.outputSerializer = UserOutputSerializer; 
        this.actionSerializer = UserGetSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class ListUsersController extends BaseController {
    constructor(){
        super();
        this.model_name = 'user';
        this.outputSerializer = UserOutputSerializer; 
        this.actionSerializer = UserListSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class ListUserPlatformsController extends BaseController {
    constructor(){
        super();
        this.model_name = 'platform';
        this.outputSerializer = PlatformOutputSerializer;
        this.actionSerializer = ListUserPlatformsSerializer
    }
};

class ListUserGuildsJoinedController extends BaseController {
    constructor(){
        super();
        this.model_name = 'guild';
        this.outputSerializer = GuildOutputSerializer;
        this.actionSerializer = ListUserGuildJoinedSerializer;
    }
};

class CreateUserController extends BaseController {
    constructor(){
        super();
        this.model_name = 'user';
        this.outputSerializer = UserOutputSerializer;
        this.actionSerializer = CreateUserSerializer;
    }
};

module.exports = {
    GetUserController: GetUserController,
    ListUsersController: ListUsersController,
    ListUserPlatformsController:ListUserPlatformsController,
    CreateUserController:CreateUserController,
    ListUserGuildsJoinedController:ListUserGuildsJoinedController
  };