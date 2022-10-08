const { Router }    = require('express');
const { check }     = require('express-validator');

const { signIn } = require('../controllers')
const { validateFields } = require('../middlewares/');

const router = Router();


/** This get method will be deleted or changed to post method */
router.post( '/signin',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password Field is required').not().isEmpty(),
    validateFields
], signIn );

module.exports = router