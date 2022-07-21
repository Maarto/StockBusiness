import { Router } from 'express';
import { putUser, deleteUser,getUser,postUser } from '../controllers/user.controllers';

let router = Router();

router.get("/user/:id", getUser);

router.post("/user", postUser);

router.put("/user/:id", putUser);

router.delete("/user/:id", deleteUser);

export default router;