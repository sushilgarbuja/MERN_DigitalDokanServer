import express, { Router } from 'express';
import OrderController from '../controllers/orderController';
import userMiddleware, { Role } from '../middleware/userMiddleware';
import errorHandler from '../services/errorHandler';

const router: Router = express.Router();

router.route('/').post( userMiddleware.isUserLoggedIn,errorHandler(OrderController.createOrder)).get( userMiddleware.isUserLoggedIn,errorHandler(OrderController.fetchMyOrders));



router.route('/all').get(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.admin), errorHandler(OrderController.fetchAllOrders));


router.route('/verify-pidx').post(userMiddleware.isUserLoggedIn,errorHandler(OrderController.verifyTransaction))

router.route('/admin/change-status/:id').patch( userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.admin),errorHandler(OrderController.changeOrderStatus))


router.route('/admin/delete-order/:id').post( userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.admin),errorHandler(OrderController.deleteOrder))


router.route('/cancel-order/:id').patch( userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.customer),errorHandler(OrderController.cancelMyOrder))

router.route('/:id').get( userMiddleware.isUserLoggedIn,errorHandler(OrderController.fetchMyOrderDetail))

export default router;