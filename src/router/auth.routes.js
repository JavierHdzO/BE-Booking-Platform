const { Router } = require('express');
const { signIn } = require('../controllers')

const router = Router();


/** This get method will be deleted or changed to post method */
router.post( '/signin', signIn );

module.exports = router