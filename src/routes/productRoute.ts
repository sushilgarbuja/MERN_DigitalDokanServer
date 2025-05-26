
import express, { Router } from 'express';
import ProductController from '../controllers/productController';
import userMiddleware, { Role } from '../middleware/userMiddleware';
import {multer,storage} from '../middleware/multerMiddleware'
import errorHandler from '../services/errorHandler';

const upload = multer({ storage: storage });
const router: Router = express.Router();

router.route('/').post( userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.admin), upload.single('productImage'),errorHandler(ProductController.createProduct)).get(ProductController.getAllProducts)


router.route('/:id').post( userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.admin),ProductController.DeleteProduct).get(errorHandler(ProductController.getSingleProducts)).delete(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.admin),ProductController.DeleteProduct).patch( userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.admin),ProductController.updateProduct);


export default router;