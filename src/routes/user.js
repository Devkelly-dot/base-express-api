const {Router} = require('express');
const {authenticateToken} = require('../middleware/auth');

const {GetUserController, ListUsersController, ListUserPlatformsController, ListUserGuildsJoinedController} = require('../controllers/user');
const {ConnectPlatformToUserController, DisonnectPlatformFromUserController} = require('../controllers/platform');
const {ConnectGuildToUserController, DisonnectGuildFromUserController} = require('../controllers/guild');

const router = Router();

const getController = new GetUserController();
const listController = new ListUsersController();

const myPlatformController = new ListUserPlatformsController();
const addPlatformController = new ConnectPlatformToUserController();
const remPlatformController = new DisonnectPlatformFromUserController();

const addGuildController = new ConnectGuildToUserController();
const remGuildController = new DisonnectGuildFromUserController();
const myGuildController = new ListUserGuildsJoinedController();

router.get('/', async (req, res)=>{listController.do(req,res)});
router.get('/:id', async (req, res)=>{getController.do(req,res)});

router.get('/platform/owned', authenticateToken, async (req, res)=>{myPlatformController.do(req,res)});
router.post('/platform/add', authenticateToken, async (req, res)=>{addPlatformController.do(req,res)});
router.post('/platform/remove', authenticateToken, async (req, res)=>{remPlatformController.do(req,res)});

router.get('/guild/joined', authenticateToken, async (req, res)=>{myGuildController.do(req,res)});
router.post('/guild/add', authenticateToken, async (req, res)=>{addGuildController.do(req,res)});
router.post('/guild/remove', authenticateToken, async (req, res)=>{remGuildController.do(req,res)});

module.exports = router;