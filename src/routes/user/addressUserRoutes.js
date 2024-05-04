import { Router } from 'express';
import AddressUserController from '../../controllers/user/AddressUserController';

const router = new Router();

router.get('/', AddressUserController.index);
router.get('/:id', AddressUserController.show);
router.get('/oneAddress/:id', AddressUserController.oneGetAddress);
router.post('/', AddressUserController.create);
router.put('/:id', AddressUserController.update);
router.delete('/:id', AddressUserController.delete);

export default router;
