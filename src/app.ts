import express from "express"
import cors from "cors"
import router from "./apps/route"


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', router)


app.get('/', (req, res) => {
    res.send(' Why are u running?')
})
export default app
