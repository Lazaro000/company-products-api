import { Router } from 'express';
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from 'src/controllers/product.controller.js';
import { isAdmin, isModerator, verifyToken } from 'src/middlewares/authJwt.js';

const router = Router();

router.post('/', [verifyToken, isModerator], createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', [verifyToken, isAdmin], updateProductById);
router.delete('/id', [verifyToken, isAdmin], deleteProductById);

export const productRoutes = router;
