import express from 'express'
import cors from 'cors'
import { userRouter } from './apps/user/user.routes'
import GlobalErrorHandlers from './apps/Errorhandlers/globalErrorHandlers'
import router from './apps/route'
import { authRouter } from './apps/auth/auth.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send(' Why are u running?')
})

app.use(GlobalErrorHandlers)
export default app
