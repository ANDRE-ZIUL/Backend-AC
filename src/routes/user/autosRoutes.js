import { Router } from 'express';
import AutosController from '../../controllers/user/AutosController';

const router = new Router();

router.get('/', AutosController.index);
router.get('/:id', AutosController.show);
router.get('/allAutos/:id', AutosController.allAutos);
router.get('/activeAutos/:id', AutosController.getMyActiveAutos);
router.get('/getOneAuto/:id', AutosController.getOneAuto);
router.post('/', AutosController.create);
router.put('/:id', AutosController.update);
router.delete('/:id', AutosController.delete);

export default router;
