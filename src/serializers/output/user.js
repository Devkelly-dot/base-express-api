BaseOutputSerializer = require('./base');
class UserOutputSerializer extends BaseOutputSerializer{
    constructor(){
        super();
        this.fields = [
            'id',
            'username',
            'email'
        ];
    } 
}

module.exports = UserOutputSerializer;