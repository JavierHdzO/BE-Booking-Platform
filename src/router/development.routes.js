const { Router } = require('express');

const { createDevelopment, 
        getDevelopment, 
        getDevelopments, 
        updateDevelopment, 
        deleteDevelopment } = require('../controllers');

const router = Router();

router.post('/', createDevelopment);

router.get('/',getDevelopments);

router.get('/:id', getDevelopment);

router.put('/:id', updateDevelopment);

router.delete('/:id', deleteDevelopment);

module.exports = router;