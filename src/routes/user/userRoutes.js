import { Router } from 'express';
import UserController from '../../controllers/user/UserController';
import loginRequired from '../../middlewares/loginRequired';

const router = new Router();

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', UserController.create);
router.put('/updatePassword/:id', UserController.updatePassword);
router.put('/:id', UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;
