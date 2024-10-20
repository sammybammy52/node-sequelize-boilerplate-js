const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const authenticateToken = require('../middleware/authMiddleware');
const { validateLogin } = require('../validators/login');
const { validateUser } = require('../validators/user');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/users', validateUser, UserController.store);
router.get('/users', UserController.index);

router.post('/register', validateUser, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

router.use(authenticateToken);

router.get('/me', AuthController.profile);

module.exports = router;
