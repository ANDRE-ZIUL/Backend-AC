import { Router } from 'express';

import PaymentFormController from '../../controllers/default/PaymentFormController';

const router = new Router();

router.get('/', PaymentFormController.index);
router.post('/', PaymentFormController.create);

export default router;
