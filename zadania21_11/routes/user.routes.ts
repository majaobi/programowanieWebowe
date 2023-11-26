import express from 'express'
import { userRead, userUpdate, userDelete, userCreate } from '../controllers/user.controllers'
const router = express.Router()

router.post('/', userCreate)
router.get('/', userRead)
router.put('/', userUpdate)
router.delete('/', userDelete)

export default router