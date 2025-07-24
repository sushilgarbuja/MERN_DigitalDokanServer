import express, { Router } from 'express';
import AuthController from '../controllers/userController';
import userMiddleware, { Role } from '../middleware/userMiddleware';
import errorHandler from '../services/errorHandler';

const router: Router = express.Router();

// Accessing UserRegister as a static method
router.route('/register').post(AuthController.UserRegister);
router.route('/login').post(AuthController.login)
router.route('/forgot-password').post(AuthController.forgotPassword)
router.route('/verify-otp').post(AuthController.verifyOtp)
router.route('/reset-password').post(AuthController.resetPassword)
router.route('/users').get(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.admin),errorHandler( AuthController.fetchUsers))
router.route('/users/:id').delete(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.admin),errorHandler( AuthController.deleteUser))

export default router;
