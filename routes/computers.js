const express = require('express');
const router = express.Router();

const computersController = require('../controllers/computers');
console.log(computersController);

router.get('/', computersController.getAll);
router.get('/:id', computersController.getSingle);
router.post('/', computersController.createComputers);
router.put('/:id', computersController.updateComputers);
router.delete('/:id', computersController.deleteComputers);




module.exports = router;