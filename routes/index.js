const express = require('express');
const passport = require('passport');
const router = express.Router();
router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World');
});

router.use('/api-docs', require('./swagger'));
router.use('/companies', require('./companies'));
router.use('/computers', require('./computers'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
