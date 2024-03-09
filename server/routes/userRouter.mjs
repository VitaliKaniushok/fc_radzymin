import {Router} from 'express'

import {userController} from '../controllers'
import {authMiddleware} from '../middleware'

const userRouter = new Router()

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/auth', authMiddleware, userController.check)

export {userRouter}