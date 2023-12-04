import { Router } from 'express';
import { getSubcategories, getSubcategory, deleteSubcategory, postSubcategory, updateSubcategory } from '../controllers/subcategoria';

const router = Router();

router.get('/', getSubcategories);         
router.get('/:id', getSubcategory);       
router.delete('/:id', deleteSubcategory);  
router.post('/', postSubcategory);         
router.put('/:id', updateSubcategory);     

export default router;

