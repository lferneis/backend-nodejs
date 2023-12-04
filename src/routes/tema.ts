import { Router } from 'express';
import { deleteTema, getTema, getTemas, postTema, updateTema } from '../controllers/tema';

const router = Router();

router.get('/', getTemas);         
router.get('/:id', getTema);        
router.delete('/:id', deleteTema);  
router.post('/', postTema);         
router.put('/:id', updateTema);     


export default router;