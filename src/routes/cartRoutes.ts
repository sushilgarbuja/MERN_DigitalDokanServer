import express, { Router } from 'express';
import CategoryController from '../controllers/categoryController';
import userMiddleware, { Role } from '../middleware/userMiddleware';
import errorHandler from '../services/errorHandler';
import cartController from '../controllers/cartController';

const router: Router = express.Router();

router.route("/")
  .post(
    userMiddleware.isUserLoggedIn,
    userMiddleware.accessTo(Role.customer),
    errorHandler(cartController.addToCart)
  )
  .get(
    userMiddleware.isUserLoggedIn,
    userMiddleware.accessTo(Role.customer),
    errorHandler(cartController.getMyCartItems)
  );

router
  .route("/:productId")
  .delete(
    userMiddleware.isUserLoggedIn,
    userMiddleware.accessTo(Role.customer),
    errorHandler(cartController.deleteMycartItem)
  )
  .patch(
    userMiddleware.isUserLoggedIn,
    userMiddleware.accessTo(Role.customer),
    errorHandler(cartController.updateCartItemQuantity)
  );

export default router;
