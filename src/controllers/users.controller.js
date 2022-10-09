const { request, response } = require('express');

const DB       = require('../database/config');
const { User } = require('../models');

const createUser = async(req = request, res = response) => {
    const { status, role, ...data } = req.body;
    const db = new DB(); //Create an Database's instance

    try {
        await db.connect();
        
        const user = new User( {...data} );
        user.password = await user.encryptPassword( user.password );
        await user.save();
        
        await db.disconnect();

        res.json({
            user,
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
    const db = new DB();
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

}

const deleteUser = async(req = request, res = response) => {
    res.json('ok');
}



module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}