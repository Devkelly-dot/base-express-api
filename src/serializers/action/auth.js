const {CreateActionSerializer} = require('./base');
const {hashPassword, comparePassword} = require('../../utils/crypt');
const {generateToken} = require('../../utils/auth');

const User = require('../../db/models/User');

class RegisterUserSerializer extends CreateActionSerializer {
    constructor() {
        super();
        this.model_name = "user";
        this.required_fields = ["username", "password", "email"];
        this.optional_fields = [];
        this.process_request = async (req, model) => {
            let return_body = {...req.body}
            return_body.email = req.body.email.toLowerCase();
            return_body.password = hashPassword(return_body.password);

            const existingUser = await User.findOne({
                $or: [{ email: return_body.email }, { username: return_body.username }]
              });
            
            if(existingUser)
            {
                return {
                    error: {
                        error:"Email or username already in use",
                        status:400
                    }
                }
            }
            
            const newUser = await User.create(return_body);
            const token = generateToken({_id:newUser._id, email: newUser.email, username: newUser.username});
            
            return_body['token'] = token;
            return {
                item: return_body,
                many: false
            }
        }
    }
};

class LoginUserSerialzer extends CreateActionSerializer {
    constructor() {
        super();
        this.model_name = "user";
        this.required_fields = ["password", "email"];
        this.optional_fields = [];
        this.process_request = async (req, model) => {
            let return_body = {}
            const {email, password} = req.body;
            const userDB = await User.findOne({email});
            if(!userDB)
            {
                return {
                    error: {
                        error:"Check your credentials",
                        status:401
                    }
                }
            }

            if(!comparePassword(password, userDB.password)){
                return {
                    error: {
                        error:"Check your credentials",
                        status:401
                    }
                }
            } else {
                return_body['id'] = userDB._id;
                return_body['email'] = req.body.email.toLowerCase();
                return_body['username'] = req.body.username;
                const token = generateToken({_id:userDB._id, email: userDB.email, username: userDB.username});
                return_body['token'] = token;

                return {
                    item: return_body,
                    many: false
                }
            }

            
            
            
            
            
            return_body['token'] = token;
            
        }
    }
};

module.exports = {
    RegisterUserSerializer: RegisterUserSerializer,
    LoginUserSerialzer: LoginUserSerialzer
};