import cors from 'cors'
import express from 'express'
import GlobalErrorHandlers from './apps/Errorhandlers/globalErrorHandlers'
import notFound from './apps/Errorhandlers/notFound'
import { blogRoutes } from './apps/modules/blog/blog.routes'
import { ProjectRoutes } from './apps/modules/project/project.routes'
import { userRouter } from './apps/modules/user/user.routes'


const app = express()
app.use(cors({
  origin: ['http://localhost:3000', "https://portfolio-blogs-backend-x2xj.onrender.com"]
}));
app.use(express.json())


app.use('/api/user', userRouter)
app.use('/api/blogs', blogRoutes)
app.use('/api/projects', ProjectRoutes)

app.get('/', (req, res) => {
  res.send(' Why are u running? SO you are gay ? Then WHOs gay')
})


app.use(notFound)
app.use(GlobalErrorHandlers as express.ErrorRequestHandler)

export default app


