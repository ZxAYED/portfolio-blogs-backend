import { Router } from "express";
import { userRouer } from "../user/user.routes";


const router = Router()
const routes = [
    {
        path: '/auth',
        route: userRouer
    },
]


routes.forEach((route) => router.use((route.path, route.route)))

export default router