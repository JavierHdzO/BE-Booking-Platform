const { request, response } =  require('express');

const { generateJWT }   = require('../helpers/');
const { User }          = require('../models/');
const DB                = require('../database/config');


const signIn = async(req = request, res = response) =>{
    // Create a Database's instance
    const db =  new DB();
    try {
        db.connect();
        // Get params from request body 
        const { email, password } = req.body;
        // Get user from DB, if exists a user with an email equal to email param
        const user = await User.findOne( {email} );

        // Verify User exists, if one exists, to compare that password param and password user are equal 
        const correctPassword = user === null ? 
                false:
                await user.comparePassword(password);
        // if password is incorrect or user status area false, return a invalid request
        if( !correctPassword || !user.status ) return res.status(401).json({
            msg:'Invalid email or password',
            ok: false
        });
    
        // generate jwt, if user exists 
        const token = await generateJWT( user.uid );
    
        // Response 200 status with the user found and him token 
        res.json({
            user,
            token
        });

        db.disconnect();
    } catch (error) {
        console.error(error);
        db.disconnect();
        res.status(500).json({
            msg: error,
            ok:false
        });
    }

}

const signOut = async( req, res = response) => {

}

module.exports = {
    signIn,
    signOut
}