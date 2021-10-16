const {Router}   = require('express');
const { getLastMessages } = require('../controllers/mesages');
const checkToken = require('../middleware/checkToken');

const router = Router();

router.get('/:de',checkToken,getLastMessages);



module.exports = router;