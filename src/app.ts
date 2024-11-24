import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

// Middleware configurations
app.use(
    cors({
        origin: [
            "https://tietheknot-3a6f0.web.app",
            "http://localhost:5173",
        ],
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(hpp());
app.use(mongoSanitize());

// Routes middleware
// fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
//     const route = require(`./routes/${file}`);
//     app.use("/api/v1", route);
// });




export default  app;


