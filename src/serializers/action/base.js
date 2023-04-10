const {getModelsByField, getModelByField} = require('../../utils/queries');
const User = require("../../db/models/User");

const fake_database = require('../../db/fake_db');
class BaseActionSerializer {
    constructor(){
    }

    do(req) {
        throw new Error("do() method must be implemented by child class");
    }
};

class GetActionSerializer extends BaseActionSerializer {
    constructor(){
        super();
        this.model_name = null;
        this.model = null;
        this.filter_method = async (req, model)=>{
            let item = fake_database[model];
            return {
                item: item,
                many: true
            }
        }
    }

    async do(req) {
        if(!this.model_name in fake_database || this.model_name == null || this.model_name == undefined)
        {
            const res = {
                error: {
                    error: "Model not found",
                    status: 404
                }
            }

            return res;
        }

        const item = await this.filter_method(req, this.model_name);
        let res = {};

        if(typeof item === 'undefined')
        {
            res = {
                error: {
                    error: "Item not found",
                    status: 404
                }
            }
        }
        else {
            res = {
                success: {
                many: item.many,
                item: item.item
            }}
        }
        return res
    }
};

class PostActionSerializer extends BaseActionSerializer {
    constructor() {
        super();
        this.model_name = null;
        this.model = null;
        this.required_fields = [];
        this.optional_fields = [];
        this.process_request = async (req, model) => {
            // Implement the specific logic for each action based on the model and request data
            throw new Error("process_request() method must be implemented by child class");
        }
    }

    async do(req) {
        if (!this.model_name in fake_database || this.model_name == null || this.model_name == undefined) {
            const res = {
                error: {
                    error: "Model not found",
                    status: 404
                }
            }

            return res;
        }

        let missing_fields = [];
        this.required_fields.map((field)=>{
            if(!(field in req.body)){
                missing_fields.push(field);
            }
        });

        if(missing_fields.length>0){
            const res = {
                error: {
                    error: 'Missing fields: ' + missing_fields.join(', '),
                    status: 400
                }
            }

            return res; 
        }

        //only send acceptable fields to be POSTed
        let validated_data = {...req, body:{}};
        
        this.required_fields.map((field)=>{
            validated_data.body[field] = req.body[field];
        });

        this.optional_fields.map((field)=>{
            if(field in req.body) {
                validated_data.body[field] = req.body[field];
            }
        });

        const result = await this.process_request(validated_data, this.model_name);

        if ("error" in result) {
            const res = {
                error: {
                    error: result.error.error,
                    status: result.error.status
                }
            }

            return res;
        }

        if (!result) {
            const res = {
                error: {
                    error: "Request could not be processed",
                    status: 500
                }
            }

            return res;
        }

        return {
            success:{
                many: result.many,
                item: result.item
            }
        };
    }
};

class CreateActionSerializer extends PostActionSerializer {
    constructor(){
        super();
        this.process_request = async (req, model) => {
            let final_object = fake_database[model][fake_database[model].length - 1];
            const new_id = final_object.id+1;
            const new_item = {id: new_id, ...req.body}
            fake_database[model].push(new_item);
            return {
                item: new_item,
                many: false
            }
        }
    }
}

class GetOneSerializer extends GetActionSerializer {
    constructor(){
        super();
        this.filter_field = null;
        this.filter_method = async (req, model)=>{
            let item = fake_database[model].find((i)=>String(i[this.filter_field])===String(req.params[this.filter_field]))
            return {
                item: item, 
                many: false
            };
        }
    }
};

class GetMineSerializer extends GetActionSerializer {
    // get many to many models when you have one of the models (get all user's guilds, platforms, etc)
    constructor(){
        super();
        this.match_field = null;
        this.relation_model = null;
        this.connected_model = null;
        this.connected_model_body_field = null;
        this.connected_model_name = null;

        this.filter_method = async (req, model)=>{
            const req_user = req.user;
            const connectedModelId = req.body[this.connected_model_body_field];

            const pipeline = [
                {
                $match: { [this.connected_model_name]: connectedModelId },
                },
                {
                $lookup: {
                    from: this.model.collection.name,
                    localField: this.model_name,
                    foreignField: '_id',
                    as: 'items',
                },
                },
                {
                $unwind: '$items',
                },
                {
                $project: {
                    _id: 0,
                    items: 1,
                },
                },
            ];
              
            const items = (await this.relation_model.aggregate(pipeline).exec()).map(doc => doc.items);
            
            return {
                item: items,
                many: true,
            };
        }
    }
};

class CreateMineSerializer extends PostActionSerializer {
    // create something connected to another model. Either it has an "owner" field (or similar) and / or they share a relationship table
    // can also just create new objects if this.ownership_field and this.relation_model are null
    constructor(){
        super();
        this.unique = false; // does the new model have a unique field? like name
        this.unique_field = null; // what is the field to check for

        this.relation_model = null; // relational table between this.model and this.connected_model
        this.ownership_field = null; // the field on this.model that points to this.connected_model if 1->many

        this.connected_model = null; // the model being connected aka the 1 in 1-> many or the other many in many->many
        this.connected_model_name = null;
        this.connected_model_body_field = null; // in the request body, has the id of the specific model we are connecting

        this.process_request = async (req, model) => {
            let new_model = {...req.body};
            
            if(this.ownership_field!==null)
                new_model[this.ownership_field] = req.body[this.connected_model_body_field];

            if(this.unique){
                const existingModel = await this.model.findOne({ [this.unique_field]: new_model[this.unique_field] });

            
                if(existingModel)
                {
                    return {
                        error:{
                            error:`${this.model_name} with that ${this.unique_field} exists`,
                            status:400
                        }
                    }
                }
            }

            const newModel = await this.model.create(new_model);
            const connectDB = await this.connected_model.findOne({ _id: req.body[this.connected_model_body_field] });

            if(this.relation_model!==null){
                const newRelation = await this.relation_model({
                    [this.connected_model_name]: connectDB._id,
                    [this.model_name]: newModel._id
                });
                
                await newRelation.save();
            }
            
            return {
                item: newModel,
                many: false
            }
            
        }
    }
}


class ConnectToMeSerializer extends PostActionSerializer {
    constructor(){
        super();
        this.relation_model = null; // relational table between this.model and this.connected_model

        this.connected_model = null; // the model being connected aka the 1 in 1-> many or the other many in many->many
        this.connected_model_name = null;
        this.connected_model_body_field = null; // in the request body, has the id of the specific model we are connecting
        
        this.required_fields = ['id_list']; // list of ids adding to the user to connect 

        this.process_request = async (req,model)=>{
            const models = await this.model.find({ _id: { $in: req.body['id_list'] } });
            const connected_to = await this.connected_model.findById(req.body[this.connected_model_body_field]);
            
            const bulkOps = [];
          
            // Build the bulk write operation
            for (const m of models) {
              const filter = {
                [this.model_name]: m._id,
                [this.connected_model_name]: connected_to._id
              };
          
              const update = {
                $setOnInsert: filter
              };
          
              const operation = {
                updateOne: {
                  filter,
                  update,
                  upsert: true
                }
              };
          
              bulkOps.push(operation);
            }
          
            // Execute the bulk write operation
            const result = await this.relation_model.bulkWrite(bulkOps);
          
            return {
              item: models,
              many: true,
            };
          };
    }
};

class DisconnectFromMeSerializer extends PostActionSerializer {
    constructor() {
      super();
      this.relation_model = null; // relational table between this.model and this.connected_model
  
      this.connected_model = null; // the model being connected aka the 1 in 1-> many or the other many in many->many
      this.connected_model_name = null;
      this.connected_model_body_field = null; // in the request body, has the id of the specific model we are connecting
  
      this.required_fields = ['id_list']; // list of ids removing from the user to disconnect
  
      this.process_request = async (req, model) => {
        const models = await this.model.find({ _id: { $in: req.body['id_list'] } });
        const connected_to = await this.connected_model.findById(req.body[this.connected_model_body_field]);
  
        const bulkOps = [];
  
        // Build the bulk write operation
        for (const m of models) {
          const filter = {
            [this.model_name]: m._id,
            [this.connected_model_name]: connected_to._id,
          };
  
          const operation = {
            deleteOne: {
              filter,
            },
          };
  
          bulkOps.push(operation);
        }
  
        // Execute the bulk write operation
        const result = await this.relation_model.bulkWrite(bulkOps);
  
        return {
          item: models,
          many: true,
        };
      };
    }
  }

module.exports = {
    BaseActionSerializer: BaseActionSerializer,
    GetActionSerializer: GetActionSerializer,
    CreateActionSerializer: CreateActionSerializer,
    GetOneSerializer: GetOneSerializer,
    GetMineSerializer:GetMineSerializer,
    ConnectToMeSerializer:ConnectToMeSerializer,
    DisconnectFromMeSerializer:DisconnectFromMeSerializer,
    CreateMineSerializer:CreateMineSerializer
  };