const { Schema, model }  = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: [true, 'Role is required'],
        enum: ['ADMIN_AITECH_ROLE', 'USER_MODERADOR_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    }

});

userSchema.method.toJSON = function(){
    const { __v, password, _id, ...user } = this.toJSON();
    user['uid'] = _id;
    return user;
}

userSchema.methods.encryptPassword = async() => {
    
}

userSchema.methods.comparePassword = async function( password ){
    return await bcrypt.compare( password, this.password );
}



module.exports = model( 'User', userSchema )

