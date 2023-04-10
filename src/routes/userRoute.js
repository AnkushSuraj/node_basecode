import express from 'express';
import userController from '../controllers/userController.js';
import { registerUser, loginUser } from '../validators/userValidator.js';

const router = express.Router();

router.post('/register', registerUser, userController.register);
router.post('/login', loginUser, userController.login);
router.get('/fetchAllUsers', userController.fetchAllUsers);

export default router;