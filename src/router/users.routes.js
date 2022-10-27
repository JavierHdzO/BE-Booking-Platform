const { Router } = require('express');
const { check, body } = require('express-validator');

const { validateJWT, 
        isAdmin, 
        checkRole, 
        validateFields,
        validateFile } = require('../middlewares/');

const { existsEmailValidator, 
        existsUserById, 
        existAccessCode} = require('../helpers/');

const { createUser, 
        getUser, 
        getUsers, 
        updateUser,
        uploadImageProfile,
        updateImageProfile, 
        deleteUser } = require('../controllers/');


    
const router = Router();

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('last_name', 'Lastname is required').not().isEmpty(),
    check('rfc', 'RFC is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('phone', 'Phone must be a numer').isNumeric(),
    check('password', 'Password must be at least 8 characters').isLength( {min:8} ),
    check('email', 'Email is required').isEmail(),
    check('email', 'Email has been registered').custom( existsEmailValidator ),
    check('access_code', 'AccessCode is required').custom( existAccessCode ),
    validateFields
], createUser);


router.get('/:id',[
    validateJWT,
    checkRole('ADMIN_AITECH_ROLE', 'USER_MODERADOR_ROLE'),
],getUser);


router.get('/',[
    validateJWT,
    checkRole('ADMIN_AITECH_ROLE', 'USER_MODERADOR_ROLE'),
    
], getUsers);


router.put('/:id',[
    validateJWT,
    checkRole('ADMIN_AITECH_ROLE', 'USER_MODERADOR_ROLE'),
    check('id', 'Id is incorrect').isMongoId(),
    validateFields
], updateUser);


router.delete('/:id',[
    validateJWT,
    check('id','id is incorrect').isMongoId(),
    check('id', '').custom( existsUserById ),
    validateFields

], deleteUser);


router.post('/profile',[ 
    validateFile
],uploadImageProfile);


router.put('/profile/update',[
    validateJWT,
    validateFile
],updateImageProfile);



module.exports = router;