const { Role } = require("../models");


const isAdmin = (req, res, next) => {

    if( !req.authUser ) return res.status(401).json({
        msg:'Token missing or incorrect',
        ok:false
    });

    const { role } = req.authUser;

    if( role !== 'ADMIN_AITECH_ROLE' ) return res.status(400).json({
        msg:'Does not have required permissions',
        ok: false
    });

    next();
}

const checkRole = (...roles) => {

    return (req, res, next) => {

        if( !req.authUser ) return res.status(400).json({
            msg:'User does not have required permissions',
            ok: false
        });

        if( !roles.includes( req.authUser.role) ) return res.status(400).json({
            msg:'User does not have required permissions',
            ok: false
        });

        next();
    }
}

module.exports = {
    isAdmin,
    checkRole
}