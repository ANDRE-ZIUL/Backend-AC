import { Router } from 'express';

import UserImageController from '../../controllers/user/UserImageController';

const router = new Router();

router.post('/', UserImageController.create);
router.get('/:id', UserImageController.show);

export default router;
