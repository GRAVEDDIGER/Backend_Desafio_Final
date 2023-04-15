import express from "express"
import { userRoutes } from "./users/users.routes"
export const app = express()

app.use(express.json())
app.use("/user",userRoutes)
