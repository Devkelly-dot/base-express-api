const {GetActionSerializer, GetOneSerializer, CreateActionSerializer, ConnectToMeSerializer, DisconnectFromMeSerializer, CreateMineSerializer} = require('./base');
const User = require("../../db/models/User");

const Platform = require("../../db/models/Platform");
const PlatformOwnership = require("../../db/models/relations/platform/PlatformOwnership");

const {getModelByField, getModelsByField} = require('../../utils/queries');

class PlatformGetSerializer extends GetOneSerializer {
    constructor() {
        super();
        this.model_name = "platform";
        this.filter_field = "id";
    }
}

class PlatformListSerializer extends GetActionSerializer {
    constructor() {
        super();
        this.model_name = "platform";
    }
}

class CreatePlatformSerializer extends CreateMineSerializer {
    constructor() {
        super();
        this.model_name = "platform";
        this.required_fields = ["displayName", "name", "user_id"];
        this.optional_fields = [];
        this.model = Platform;
        this.relation_model = PlatformOwnership;
        this.unique = true;
        this.unique_field = "name";
        this.connected_model = User;
        this.connected_model_body_field = "user_id";
        this.connected_model_name = 'user';
    }
};

class ConnectPlatformToUserSerializer extends ConnectToMeSerializer {
    constructor(){
        super();
        this.model = Platform;
        this.model_name = 'platform';
        this.required_fields = ['id_list', 'user_id'];

        this.relation_model = PlatformOwnership; // relational table between this.model and this.connected_model

        this.connected_model = User; // the model being connected aka the 1 in 1-> many or the other many in many->many
        this.connected_model_name = 'user';
        this.connected_model_body_field = 'user_id'; // in the request body, has the id of the specific model we are connecting
    }
}

class DisconnectPlatformFromUserSerializer extends DisconnectFromMeSerializer {
    constructor(){
        super();
        this.model = Platform;
        this.model_name = 'platform';
        this.required_fields = ['id_list', 'user_id'];

        this.relation_model = PlatformOwnership; // relational table between this.model and this.connected_model

        this.connected_model = User; // the model being connected aka the 1 in 1-> many or the other many in many->many
        this.connected_model_name = 'user';
        this.connected_model_body_field = 'user_id'; // in the request body, has the id of the specific model we are connecting
    }
}

module.exports = {
    PlatformGetSerializer: PlatformGetSerializer,
    PlatformListSerializer: PlatformListSerializer,
    CreatePlatformSerializer: CreatePlatformSerializer,
    ConnectPlatformToUserSerializer: ConnectPlatformToUserSerializer,
    DisconnectPlatformFromUserSerializer: DisconnectPlatformFromUserSerializer
  };