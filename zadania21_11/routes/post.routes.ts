import express from "express";
import { postCreate, postRead, postUpdate, postDelete } from "../controllers/post.controllers";

const router = express.Router();

router.post('/', postCreate);
router.get('/', postRead);
router.put('/:id', postUpdate);
router.delete('/:id', postDelete);

export default router;