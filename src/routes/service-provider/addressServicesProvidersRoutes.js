import { Router } from 'express';
import AddressServiceProviderController from '../../controllers/service-provider/AddressServiceProviderController';

const router = new Router();

router.get('/', AddressServiceProviderController.index);
router.get('/:id', AddressServiceProviderController.show);
router.post('/', AddressServiceProviderController.create);
router.put('/:id', AddressServiceProviderController.update);
router.delete('/:id', AddressServiceProviderController.delete);

export default router;
