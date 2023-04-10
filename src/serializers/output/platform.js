BaseOutputSerializer = require('./base');
class PlatformOutputSerializer extends BaseOutputSerializer{
    constructor(){
        super();
        this.fields = [
            '_id',
            'displayName'
        ];
    } 
}

module.exports = PlatformOutputSerializer;