import {Router} from 'express'

import {userRouter} from './userRouter.mjs'

const router = new Router();

router.use('/user', userRouter)

export default router