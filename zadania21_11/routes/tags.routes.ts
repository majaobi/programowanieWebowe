import express from 'express';
import { tagsCreate, tagsRead, tagsUpdate, tagsDelete } from '../controllers/tags.controllers';

const router = express.Router();

router.post('/', tagsCreate);
router.get('/', tagsRead);
router.put('/:id', tagsUpdate);
router.delete('/:id', tagsDelete);

export default router;