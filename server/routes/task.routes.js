import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router({ mergeParams: true });

// mergeParams: true allows access to :projectId from parent route

router.use(verifyToken);

router.route('/').get(getTasks).post(createTask);
router.route('/:taskId').put(updateTask).delete(deleteTask);

export default router;