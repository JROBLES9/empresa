import { Router } from 'express';
import AlertaController from '../controllers/alerta';

const router = Router();

router.get('/', AlertaController.getAlertas);
router.get('/:id', AlertaController.getAlerta);
router.post('/', AlertaController.createAlerta);
router.put('/:id', AlertaController.updateAlerta);
router.delete('/:id', AlertaController.deleteAlerta);

export default router;