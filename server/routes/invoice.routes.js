import { Router } from 'express';
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoice.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.route('/').get(getInvoices).post(createInvoice);
router.route('/:id').put(updateInvoice).delete(deleteInvoice);

export default router;