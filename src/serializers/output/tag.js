BaseOutputSerializer = require('./base');
class TagOutputSerializer extends BaseOutputSerializer{
    constructor(){
        super();
        this.fields = [
            '_id',
            'displayName',
        ];
    } 
}

module.exports = TagOutputSerializer;