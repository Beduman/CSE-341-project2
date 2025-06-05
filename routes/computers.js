const express = require('express');
const router = express.Router();
const computersController = require('../controllers/computers');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', computersController.getAll);
router.get('/:id', computersController.getSingle);
router.post('/', isAuthenticated, computersController.createComputers);
router.put('/:id', isAuthenticated, computersController.updateComputers);
router.delete('/:id', isAuthenticated, computersController.deleteComputers);




module.exports = router;