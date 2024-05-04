import { Router } from 'express';

import ServiceCategoryController from '../../controllers/default/ServiceCategoryController';

const router = new Router();

router.get('/', ServiceCategoryController.index);
router.post('/', ServiceCategoryController.create);

export default router;
