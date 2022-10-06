
const { request, response } =  require('express');

const signIn = async(req, res = response) =>{
    res.send('Ok');
}

const signOut = async( req, res = response) => {

}


module.exports = {
    signIn,
    signOut
}