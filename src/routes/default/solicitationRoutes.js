import { Router } from 'express';

import SolicitationController from '../../controllers/default/SolicitationController';

const router = new Router();
router.get('/oneSolicitation/:id', SolicitationController.oneSolicitation);
router.get('/myServices/:id', SolicitationController.getMyServices);
router.get('/serviceFinally/:id', SolicitationController.getServicesFinally);
router.get('/serviceProgress/:id', SolicitationController.getServicesProgress);
router.get('/servicesMonth/:id', SolicitationController.getServicesMonth);
router.get('/servicesCancel/:id', SolicitationController.getServicesCancel);
router.get('/openSolicitations/', SolicitationController.getOpenSolicitations);
router.get('/:id', SolicitationController.show);
router.get('/newSolicitations/:status', SolicitationController.getAllSolicitations);
router.get('/getSolicitationAssessment/:id', SolicitationController.mySolicitationsWithAssessment);
router.get('/', SolicitationController.index);
router.post('/', SolicitationController.create);
router.put('/:id', SolicitationController.update);

export default router;
