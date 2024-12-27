import app from "./app"
import mongoose from 'mongoose';
const port = 5000
import { Server } from 'http'
import config from "./apps/config";


let server: Server

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('Connected to the database')

        server = app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        })
        return server
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}
main().catch(err => console.log(err));

process.on('unhandledRejection', () => {
    console.log("unhandledRejection occured, server is down");
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on('uncaughtException', () => {
    console.log("uncaughtException occured, server is down");
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})