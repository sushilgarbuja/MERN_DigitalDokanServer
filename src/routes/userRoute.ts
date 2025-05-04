import express, { Router } from 'express';
import AuthController from '../controllers/userController';

const router: Router = express.Router();

// Accessing UserRegister as a static method
router.route('/register').post(AuthController.UserRegister);
router.route('/login').post(AuthController.login)
router.route('/forgot-password').post(AuthController.forgotPassword)

export default router;
