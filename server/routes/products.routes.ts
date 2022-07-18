import { Router } from 'express';
import { getProducts, postProducts, putProducts, deleteProducts } from '../controllers/products.controllers';

let router = Router();

router.get("/products/:id", getProducts);

router.post("/products", postProducts);

router.put("/products/:id", putProducts);

router.delete("/products/:id", deleteProducts);

export default router;