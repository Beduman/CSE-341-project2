const express = require('express');
const router = express.Router();

//router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World');
});

router.use('/companies', require('./companies'));
router.use('/computers', require('./computers'));

module.exports = router;
