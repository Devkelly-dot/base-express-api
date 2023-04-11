const {Router} = require('express');
const {GetPlatformController, ListPlatformController} = require('../controllers/platform');
const {CreateGuildController, AddTagController, RemoveTagController, ListGuildTagsController} = require('../controllers/guild');

const {authenticateToken, verifyOwnership} = require('../middleware/auth');
const {full_cleanup} = require('../middleware/modifyField');
const {paramsToBody} = require('../middleware/addBody');

const router = Router();

const getController = new GetPlatformController();
const listController = new ListPlatformController();
const createController = new CreateGuildController();

const addTagController = new AddTagController();
const removeTagController = new RemoveTagController();
const listTagsController = new ListGuildTagsController();

const Guild = require('../db/models/Guild');

router.get('/', async (req, res)=>{listController.do(req,res)});

router.get('/:id', async (req, res)=>{getController.do(req,res)});
router.get('/:id/tag', async (req,res,next)=>paramsToBody(req,res,next,[{body_field: 'guild_id', param: 'id'}]), async (req, res)=>{listTagsController.do(req,res)});

router.post('/:id/tag/add',
    authenticateToken, 
    async (req,res,next)=>paramsToBody(req,res,next,[{body_field: 'guild_id', param: 'id'}]),
    async (req,res,next)=>verifyOwnership(req,res,next, Guild, 'owner', 'guild_id', 'user_id'),
    async (req, res)=>{addTagController.do(req,res)});

router.post('/:id/tag/remove',
    authenticateToken, 
    async (req,res,next)=>paramsToBody(req,res,next,[{body_field: 'guild_id', param: 'id'}]),
    async (req,res,next)=>verifyOwnership(req,res,next, Guild, 'owner', 'guild_id', 'user_id'),
    async (req, res)=>{removeTagController.do(req,res)});

router.post('/',authenticateToken, async (req,res,next)=>full_cleanup(req,res,next, 'displayName', 'name'), async (req, res)=>{createController.do(req,res)});

module.exports = router;