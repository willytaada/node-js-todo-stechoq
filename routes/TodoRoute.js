import { createTodo, showTodo, updateTodo, deleteTodo } from '../controllers/TodoController.js';
import { Router } from 'express';

const router = Router();

router.get('/', showTodo);
router.post('/create', createTodo);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);

export default router;