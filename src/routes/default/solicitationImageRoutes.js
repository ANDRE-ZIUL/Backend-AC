import { Router } from 'express';

import SolicitationImageController from '../../controllers/default/SolicitationImageController';

const router = new Router();

router.get('/:id', SolicitationImageController.show);
router.post('/', SolicitationImageController.create);

export default router;
