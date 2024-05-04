import { Router } from 'express';
import EmployeeController from '../../controllers/service-provider/EmployeeController';

const router = new Router();

router.get('/', EmployeeController.index);
router.get('/:id', EmployeeController.show);
router.get('/oneEmployee/:id', EmployeeController.getOneEmployee);
router.post('/', EmployeeController.create);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

export default router;
