const { Router } = require('express');

const { createUser, getUser, getUsers, updateUser, deleteUser } = require('../controllers/')

const router = Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;