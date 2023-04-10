import express from 'express';
import userRoutes from './userRoute.js';
import customerRouter from './customerRouter.js'

const router = express.Router();

router.use('/user', userRoutes);
router.use('/customer', customerRouter);

export default router;