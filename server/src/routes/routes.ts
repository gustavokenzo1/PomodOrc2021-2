import { Router } from 'express';

const SessionController = require('../controllers/SessionController');
const TaskController = require('../controllers/TaskController');
const DashboardController = require('../controllers/DashboardController');

const router = Router();

router.post('/sessions', SessionController.store);
router.get('/dashboard', DashboardController.show);

router.get('/tasks', TaskController.index);
router.post('/tasks', TaskController.store);

export default router;