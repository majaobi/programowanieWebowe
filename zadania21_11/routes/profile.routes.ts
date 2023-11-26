import express from 'express';
import { profileCreate, profileRead, profileUpdate, profileDelete } from '../controllers/profile.controllers';

const router = express.Router();

router.post('/', profileCreate);
router.get('/', profileRead);
router.put('/:id', profileUpdate);
router.delete('/:id', profileDelete);

export default router;


