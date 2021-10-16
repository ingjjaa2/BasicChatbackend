const {Router} = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validate } = require('../middleware/validate');
const checkToken = require('../middleware/checkToken');

const router = Router();

router.post('/new',[
    check('nombre','nombre is required').notEmpty(),
    check('email','email is required').isEmail(),
    check('password','password is required').notEmpty(),
    validate
],createUser);

router.post('/',[
    check('email','Email is required').isEmail(),
    check('password','Password is required').notEmpty(),
    validate
],loginUser);


router.get('/renew',checkToken,renewToken);


module.exports = router;