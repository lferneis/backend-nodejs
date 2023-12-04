import { Router } from 'express';
import { deleteCategory, getCategory, getCategories, postCategory, updateCategory } from '../controllers/categoria';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);
router.post('/', postCategory);
router.put('/:id', updateCategory);

export default router;