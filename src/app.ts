import express from 'express'
import cors from 'cors'
import { userRouter } from './apps/user/user.routes'
import GlobalErrorHandlers from './apps/errorhandlers/globalErrorHandlers'
import router from './apps/route'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', userRouter)

app.get('/', (req, res) => {
  res.send(' Why are u running?')
})

app.use(GlobalErrorHandlers)
export default app
