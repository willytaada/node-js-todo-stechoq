import { Router } from 'express';
import userRoutes from './UserRoute.js';
import todoRoutes from './TodoRoute.js';
import { checkCredentials } from '../middlewares/checkCredentials.js';
const router = Router();


router.get('/', (req, res) => {
    res.send("Stechoq - Tugas Membuat API")
});

router.use('/api/users/', userRoutes);
router.use('/api/todos/', checkCredentials, todoRoutes);

export default router;