import express, { Router } from 'express';
import CategoryController from '../controllers/categoryController';
import userMiddleware, { Role } from '../middleware/userMiddleware';

const router: Router = express.Router();

router.route('/').get(CategoryController.getCategory).post( userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.admin), CategoryController.addCategory);

router.route('/:id').delete(userMiddleware.restrictTo(Role.admin), CategoryController.deleteCategory).patch( userMiddleware.restrictTo(Role.admin),CategoryController.updateCategory);

export default router;
