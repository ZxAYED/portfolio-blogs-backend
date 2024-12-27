import express from "express";
import { userRouter } from "../user/user.routes";


const router = express.Router()
const AllRoutes = [
    {
        path: '/auth',
        route: userRouter
    },
]


AllRoutes.forEach((route) => router.use((route.path, route.route)))


export default router