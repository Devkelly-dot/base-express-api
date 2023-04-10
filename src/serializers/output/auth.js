BaseOutputSerializer = require('./base');
class AuthUserOutputSerializer extends BaseOutputSerializer{
    constructor(){
        super();
        this.fields = [
            'id',
            'email',
            'username',
            'token'
        ];
    } 
}

module.exports = AuthUserOutputSerializer;