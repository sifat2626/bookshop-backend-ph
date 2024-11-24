import { Request, Response, NextFunction } from "express";

// Custom Error Handler Middleware
const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Extract stack trace only in development
    const stack = process.env.NODE_ENV === "development" ? err.stack : undefined;

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        success: false,
        error: {
            name: err.name || "Error",
            ...(err.errors ? { errors: err.errors } : {}),
        },
        stack,
    });
};

export default errorHandler;
