const BaseController = require('./base'); 
const {PlatformGetSerializer, PlatformListSerializer, CreatePlatformSerializer, ConnectPlatformToUserSerializer, DisconnectPlatformFromUserSerializer} = require('../serializers/action/platform');
const PlatformOutputSerializer = require('../serializers/output/platform');

class GetPlatformController extends BaseController {
    constructor(){
        super();
        this.model_name = 'platform';
        this.outputSerializer = PlatformOutputSerializer; 
        this.actionSerializer = PlatformGetSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class ListPlatformController extends BaseController {
    constructor(){
        super();
        this.model_name = 'platform';
        this.outputSerializer = PlatformOutputSerializer; 
        this.actionSerializer = PlatformListSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class CreatePlatformController extends BaseController {
    constructor(){
        super();
        this.model_name = 'platform';
        this.outputSerializer = PlatformOutputSerializer; 
        this.actionSerializer = CreatePlatformSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class ConnectPlatformToUserController extends BaseController {
    constructor(){
        super();
        this.model_name = 'platform';
        this.outputSerializer = PlatformOutputSerializer;
        this.actionSerializer = ConnectPlatformToUserSerializer;
    }
}

class DisonnectPlatformFromUserController extends BaseController {
    constructor(){
        super();
        this.model_name = 'platform';
        this.outputSerializer = PlatformOutputSerializer;
        this.actionSerializer = DisconnectPlatformFromUserSerializer;
    }
}

module.exports = {
    GetPlatformController: GetPlatformController,
    ListPlatformController: ListPlatformController,
    CreatePlatformController: CreatePlatformController,
    ConnectPlatformToUserController: ConnectPlatformToUserController,
    DisonnectPlatformFromUserController: DisonnectPlatformFromUserController
  };