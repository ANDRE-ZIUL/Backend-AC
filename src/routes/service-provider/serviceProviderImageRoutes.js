import { Router } from 'express';

import ServiceProviderImageController from '../../controllers/service-provider/ServiceProviderImageController';

const router = new Router();

router.get('/:id', ServiceProviderImageController.show);
router.post('/', ServiceProviderImageController.create);

export default router;
