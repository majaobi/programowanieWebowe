import express from 'express';
import { commentCreate, commentRead, commentUpdate, commentDelete } from '../controllers/comment.controllers';

const router = express.Router();

router.post('/', commentCreate);
router.get('/', commentRead);
router.put('/:id', commentUpdate);
router.delete('/:id', commentDelete);

export default router;