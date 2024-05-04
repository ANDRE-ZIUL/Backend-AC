import { Router } from 'express';
import ServiceProviderController from '../../controllers/service-provider/ServiceProviderController';

const router = new Router();

router.get('/', ServiceProviderController.index);
router.get('/:id', ServiceProviderController.show);
router.post('/', ServiceProviderController.create);
router.put('/:id', ServiceProviderController.update);
router.put('/updatePassword/:id', ServiceProviderController.updatePassword);
router.delete('/:id', ServiceProviderController.delete);

export default router;
