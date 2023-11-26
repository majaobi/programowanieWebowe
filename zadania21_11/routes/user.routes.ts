import express from 'express'
import { userRead, userUpdate, userDelete, userCreate } from '../controllers/user.controllers'
const router = express.Router()

router.post('/', userCreate)
router.get('/', userRead)
router.put('/:id', userUpdate)
router.delete('/:id', userDelete)

export default router