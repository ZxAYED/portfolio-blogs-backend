import express from 'express'
import cors from 'cors'
import { userRouter } from './apps/modules/user/user.routes'
import GlobalErrorHandlers from './apps/Errorhandlers/globalErrorHandlers'

import { authRouter } from './apps/modules/auth/auth.routes'
import { blogRoutes } from './apps/modules/blog/blog.routes'
import notFound from './apps/Errorhandlers/notFound'
import { adminRouter } from './apps/modules/admin/admin.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/blogs', blogRoutes)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
  res.send(' Why are u running? SO you are gay ? Then WHOs gay')
})


app.use(notFound)
app.use(GlobalErrorHandlers as express.ErrorRequestHandler)

export default app
