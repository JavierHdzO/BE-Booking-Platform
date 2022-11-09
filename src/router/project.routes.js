const { Router } = require('express');
const { createProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject } = require('../controllers');

const router = Router();

router.post('/', createProject);
router.get('/:id/all', getProjects);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;