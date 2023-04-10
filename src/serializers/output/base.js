class BaseOutputSerializer {
    constructor(){
        this.fields = null;
    } 

    do(object_list, many)
    {
        if(many === false)
        {
            let response = {};

            this.fields.map(field=>{
                response[field] = object_list[field];
            })

            return {success: response};
        }

        let response = [];

        object_list.map(o=>{
            let add_obj = {};
            this.fields.map(field=>{
                add_obj[field] = o[field];
            });
            response.push(add_obj);
        });

        return {success: response};
    }
}

module.exports = BaseOutputSerializer;