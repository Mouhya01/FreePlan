import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// All project routes require authentication
router.use(verifyToken);

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);

export default router;