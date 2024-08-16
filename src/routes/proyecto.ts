import { Router } from 'express';
import ProyectoController from '../controllers/proyecto';

const router = Router();

router.get('/all/:state', ProyectoController.getProyectos);
router.get('/:id', ProyectoController.getProyecto);
router.post('/', ProyectoController.createProyecto);
router.put('/:id', ProyectoController.updateProyecto);
router.delete('/:id', ProyectoController.deleteProyecto);

export default router;