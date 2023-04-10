const fake_database = require('../db/fake_db');

class BaseController { 
    // takes request, runs it through an action serializer, then outputs an object or array of objects with output serializer 
    constructor() {
        this.outputSerializer = null;
        this.actionSerializer = null; 
        this.model_name = null;
    }

    async do(req, res) {
        const outputSerializer = new this.outputSerializer();
        const actionSerializer = new this.actionSerializer(); 

        const action_response = await actionSerializer.do(req);
        
        if("error" in action_response)
        {
            res.status(action_response.error.status).json({Error:action_response.error.error});
            return; 
        }

        if(!"success" in action_response)
        {
            res.status(500).json({Error:"Something went wrong"});
            return; 
        }
        
        const output_response = outputSerializer.do(action_response.success.item, action_response.success.many);

        if("error" in output_response)
        {
            res.status(output_response.error.status).json({error:output_response.error.error});
            return; 
        }
        if(!"success" in output_response)
        {
            res.status(500).json({Error:"Something went wrong"});
            return; 
        }

        res.status(200).json(output_response.success);
    }
}

module.exports = BaseController;