const {Router} = require('express');
const {GetPlatformController, ListPlatformController, CreatePlatformController} = require('../controllers/platform');
const {CreateGuildController} = require('../controllers/guild');

const {authenticateToken} = require('../middleware/auth');
const {full_cleanup} = require('../middleware/modifyField');

const router = Router();

const getController = new GetPlatformController();
const listController = new ListPlatformController();
const createController = new CreateGuildController();

router.get('/', async (req, res)=>{listController.do(req,res)});

router.get('/:id', async (req, res)=>{getController.do(req,res)});

router.post('/',authenticateToken, async (req,res,next)=>full_cleanup(req,res,next, 'displayName', 'name'), async (req, res)=>{createController.do(req,res)});

module.exports = router;