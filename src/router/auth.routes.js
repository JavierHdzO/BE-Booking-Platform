const { Router } = require('express');
const { signIn } = require('../controllers')

const router = Router();


/** This get method will be deleted or changed to post method */
router.get( '/signin', signIn );

module.exports = router