const BaseController = require('./base'); 

const {CreateGuildSerializer, ConnectGuildToUserSerializer, DisconnectGuildFromUserSerializer, GuildGetSerializer, GuildListSerializer} = require('../serializers/action/guild');
const GuildOutputSerializer = require('../serializers/output/guild');

class GetGuildController extends BaseController {
    constructor(){
        super();
        this.model_name = 'guild';
        this.outputSerializer = GuildOutputSerializer; 
        this.actionSerializer = GuildGetSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class ListGuildController extends BaseController {
    constructor(){
        super();
        this.model_name = 'guild';
        this.outputSerializer = GuildOutputSerializer; 
        this.actionSerializer = GuildListSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class CreateGuildController extends BaseController {
    constructor(){
        super();
        this.model_name = 'guild';
        this.outputSerializer = GuildOutputSerializer; 
        this.actionSerializer = CreateGuildSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class ConnectGuildToUserController extends BaseController {
    constructor(){
        super();
        this.model_name = 'guild';
        this.outputSerializer = GuildOutputSerializer;
        this.actionSerializer = ConnectGuildToUserSerializer;
    }
}

class DisonnectGuildFromUserController extends BaseController {
    constructor(){
        super();
        this.model_name = 'guild';
        this.outputSerializer = GuildOutputSerializer;
        this.actionSerializer = DisconnectGuildFromUserSerializer;
    }
}

module.exports = {
    GetGuildController: GetGuildController,
    ListGuildController: ListGuildController,
    CreateGuildController: CreateGuildController,
    ConnectGuildToUserController: ConnectGuildToUserController,
    DisonnectGuildFromUserController: DisonnectGuildFromUserController
  };