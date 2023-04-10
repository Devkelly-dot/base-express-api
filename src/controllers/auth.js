const BaseController = require('./base'); 
const {RegisterUserSerializer, LoginUserSerialzer} = require('../serializers/action/auth');
const AuthUserOutputSerializer = require('../serializers/output/auth');

class RegisterUserController extends BaseController {
    constructor(){
        super();
        this.model_name = 'user';
        this.outputSerializer = AuthUserOutputSerializer; 
        this.actionSerializer = RegisterUserSerializer;
        this.actionSerializer.model_name = this.model_name;
    }
}

class LoginUserController extends BaseController {
    constructor(){
        super();
        this.model_name = 'user';
        this.outputSerializer = AuthUserOutputSerializer; 
        this.actionSerializer = LoginUserSerialzer;
        this.actionSerializer.model_name = this.model_name;
    }
}

module.exports = {
    RegisterUserController: RegisterUserController,
    LoginUserController:LoginUserController
  };