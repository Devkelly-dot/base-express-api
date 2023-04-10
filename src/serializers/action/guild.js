const {GetActionSerializer, GetOneSerializer, CreateActionSerializer, ConnectToMeSerializer, DisconnectFromMeSerializer, CreateMineSerializer} = require('./base');
const Guild = require("../../db/models/Guild");
const User = require("../../db/models/User");
const Membership = require("../../db/models/relations/User/Membership");

class GuildGetSerializer extends GetOneSerializer {
    constructor() {
        super();
        this.model_name = "guild";
        this.filter_field = "id";
    }
}

class GuildListSerializer extends GetActionSerializer {
    constructor() {
        super();
        this.model_name = "guild";
    }
}

class CreateGuildSerializer extends CreateMineSerializer {
    constructor() {
        super();
        this.model_name = "guild";
        this.required_fields = ["displayName", "name", "user_id"];
        this.optional_fields = [];
        this.model = Guild
        this.relation_model = Membership
        this.ownership_field = "owner"
        this.unique = true;
        this.unique_field = "name";
        this.connected_model = User;
        this.connected_model_body_field = "user_id";
        this.connected_model_name = 'user';
    }
};

class ConnectGuildToUserSerializer extends ConnectToMeSerializer {
    constructor(){
        super();
        this.model = Guild;
        this.model_name = 'guild';
        this.required_fields = ['id_list', 'user_id'];
        
        this.relation_model = Membership; // relational table between this.model and this.connected_model

        this.connected_model = User; // the model being connected aka the 1 in 1-> many or the other many in many->many
        this.connected_model_name = 'user';
        this.connected_model_body_field = 'user_id'; // in the request body, has the id of the specific model we are connecting
    }
}

class DisconnectGuildFromUserSerializer extends DisconnectFromMeSerializer {
    constructor(){
        super();
        this.model = Guild;
        this.model_name = 'guild';
        this.required_fields = ['id_list', 'user_id'];

        this.relation_model = Membership; // relational table between this.model and this.connected_model

        this.connected_model = User; // the model being connected aka the 1 in 1-> many or the other many in many->many
        this.connected_model_name = 'user';
        this.connected_model_body_field = 'user_id'; // in the request body, has the id of the specific model we are connecting
    }
}

module.exports = {
    GuildGetSerializer: GuildGetSerializer,
    GuildListSerializer: GuildListSerializer,
    CreateGuildSerializer: CreateGuildSerializer,
    ConnectGuildToUserSerializer: ConnectGuildToUserSerializer,
    DisconnectGuildFromUserSerializer: DisconnectGuildFromUserSerializer
  };