import { showUser, register, updateUser, deleteUser, login } from '../controllers/UserController.js';
import { Router } from 'express';

const router = Router();

router.get('/', showUser);
router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;