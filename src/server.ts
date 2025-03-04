import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './apps/config'
const port = 5000

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Connected to the database')

    server = app.listen(config.port, () => {
      console.log(`Echos of the mind app listening on port ${config.port}`)
    })
    return server
  } catch (error) {
    console.error('Error starting the server:', error)
  }
}
main().catch(err => console.log(err))

process.on('unhandledRejection', () => {
  console.log('unhandledRejection occured, server is down')
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log('uncaughtException occured, server is down')
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})
