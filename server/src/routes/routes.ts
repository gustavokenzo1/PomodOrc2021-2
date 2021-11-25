import { Router } from 'express';
import userRoutes from './userRoutes';
import taskRoutes from './taskRoutes';
import dashboardRoutes from './dashboardRoutes';

const router = Router()

router.use('/sessions', userRoutes)
router.use('/tasks', taskRoutes)
router.use('/dashboard', dashboardRoutes)

export default router;