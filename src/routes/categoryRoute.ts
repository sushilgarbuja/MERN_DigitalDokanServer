import express, { Router } from 'express';
import CategoryController from '../controllers/categoryController';
import userMiddleware, { Role } from '../middleware/userMiddleware';
import categoryController from '../controllers/categoryController';
import errorHandler from '../services/errorHandler';

const router: Router = express.Router();

router.route('/').get(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.admin),errorHandler (CategoryController.getCategory)).post( userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.admin), CategoryController.addCategory);

// router.route('/:id').delete(userMiddleware.restrictTo(Role.admin), CategoryController.deleteCategory).patch( userMiddleware.restrictTo(Role.admin),CategoryController.updateCategory);
  router.route('/:id')
  .patch(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.admin), categoryController.updateCategory)
  .delete(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.admin), categoryController.deleteCategory)


export default router;
