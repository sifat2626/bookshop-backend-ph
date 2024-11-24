// types/express.d.ts

import { Request } from "express";
import {TBook} from "./models/book.model";

declare global {
    namespace Express {
        interface Request {
            body: TBook; // Here we are typing req.body as TBook
        }
    }
}
