const {Router} = require('express');
const {RegisterUserController, LoginUserController} = require('../controllers/auth');

const router = Router();
const registerController = new RegisterUserController();
const loginController = new LoginUserController();
router.post('/register', async (req, res) => {registerController.do(req, res)});
router.post('/login', async (req, res) => {loginController.do(req, res)});

module.exports = router;