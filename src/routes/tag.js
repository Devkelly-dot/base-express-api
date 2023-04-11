const {Router} = require('express');
const {CreateTagController} = require('../controllers/tag');
const {authenticateToken} = require('../middleware/auth');
const {full_cleanup} = require('../middleware/modifyField');

const router = Router();

const createController = new CreateTagController();

router.post('/',authenticateToken, async (req,res,next)=>full_cleanup(req,res,next, 'displayName', 'name'), async (req, res)=>{createController.do(req,res)});

module.exports = router;