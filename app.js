import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import fileRoutes from "./src/routes/file.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const app = express();
app.use(express.json({limit:'16kb'}));

app.get('/' , (req , res)=>{
    res.json({message: 'Home route'})
})

app.use(errorHandler);
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

export default app;
