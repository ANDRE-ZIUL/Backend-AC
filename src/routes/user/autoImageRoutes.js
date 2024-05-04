import { Router } from 'express';

import AutoImageController from '../../controllers/user/AutoImageController';

const router = new Router();

router.post('/', AutoImageController.create);
router.get('/:userId', AutoImageController.getImagesForId);

export default router;
