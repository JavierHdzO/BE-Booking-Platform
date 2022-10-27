const { request, response } = require('express');
const database        = require('../database/config');
const { User }  = require('../models');

const { uploadFile, removeFile } = require('../helpers');

const createUser = async(req = request, res = response) => {
    const { status, role, ...data } = req.body;
    const db = new database(); //Create an Database's instance

    try {
        await db.connect();
        
        const user = new User( {...data} );
        user.password = await user.encryptPassword( user.password );
        await user.save();
        
        await db.disconnect();

        tempUser = user.toJSON()
        delete tempUser.status;
        delete tempUser.role;
        delete tempUser.uid;

        console.log( tempUser );

        res.json({
            user: tempUser,
            ok:true
        });
        
    } catch (error) {
        console.error( error );
        db.disconnect();
        res.status(500).json({
            msg: 'Report this issue to the admin',
            ok:false
        });
    }




}

const getUser = async(req = request, res = response) => {
    

}

const getUsers = async(req = request, res = response) => {
    const db = new database();
    try {
        await db.connect();
        const users = await User.find();
        await db.disconnect();

        res.json({
            users,
            ok:true
        });

    } catch (error) {
        db.disconnect();
        res.status(500).json({
            msg:'',
            ok:false
        });
        
    }
}

const updateUser = async(req = request, res = response) => {
    res.json({
        ok:true
    });

}

const deleteUser = async(req = request, res = response) => {
    res.json({
        ok:true
    });
}

const uploadImageProfile = async(req, res) => {

    try {
        const name = await uploadFile( req.files, undefined , 'users' );

        res.json({
            name,
            ok:true
        })
        
    } catch (error) {
        console.log(error);

        res.status(400).json({
            msg: error,
            ok:false
        });
    }
    
}

const updateImageProfile = async(req, res) => {

    const { uid } = req;
    const db = new database();

    try {
        await db.connect();

        const user = await User.findById(uid);

        /**
         * Remove file from server
         */
        removeFile(user.profile, 'users');

        const name = await uploadFile( req.files, undefined , 'users' );

        user.profile = name;
        await user.save();
        
        await db.disconnect();

        /**
         * Remove file from server
         */

        res.json({
            user,
            ok:true
        });
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        res.status(500).json({
            msg: 'Report this issue to the admin'
        });
    }


}



module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    uploadImageProfile,
    updateImageProfile

}