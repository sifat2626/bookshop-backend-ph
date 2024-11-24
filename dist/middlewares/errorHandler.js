"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    // Extract stack trace only in development
    const stack = process.env.NODE_ENV === "development" ? err.stack : undefined;
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        success: false,
        error: Object.assign({ name: err.name || "Error" }, (err.errors ? { errors: err.errors } : {})),
        stack,
    });
};
exports.default = errorHandler;
