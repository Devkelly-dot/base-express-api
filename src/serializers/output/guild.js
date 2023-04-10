BaseOutputSerializer = require('./base');
class GuildOutputSerializer extends BaseOutputSerializer{
    constructor(){
        super();
        this.fields = [
            '_id',
            'displayName',
        ];
    } 
}

module.exports = GuildOutputSerializer;