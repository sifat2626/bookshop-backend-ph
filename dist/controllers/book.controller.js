"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_service_1 = require("../services/book.service");
// Controller to handle book creation
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, price, category, description, quantity, inStock } = req.body;
        // Validate required fields
        if (!title || !price || !category) {
            res.status(400).json({
                success: false,
                message: "Title, price, and category are required",
            });
            return;
        }
        // Call the service to create a new book
        const book = yield (0, book_service_1.createBookService)({
            title,
            author,
            price,
            category,
            description,
            quantity,
            inStock,
        });
        // Send response
        res.status(201).json({
            success: true,
            data: book,
        });
    }
    catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
exports.createBook = createBook;
// Controller to get all books or books by a search term
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        // Call the service to get all books
        const books = yield (0, book_service_1.getAllBooksService)(searchTerm);
        // Return the response
        res.status(200).json({
            message: "Books retrieved successfully",
            status: true,
            data: books,
        });
    }
    catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
exports.getAllBooks = getAllBooks;
// Controller to get a specific book by ID
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // Call the service to get a book by ID
        const book = yield (0, book_service_1.getBookByIdService)(productId);
        if (!book) {
            res.status(404).json({
                message: "Book not found",
                status: false,
                data: null,
            });
            return;
        }
        // Return the book data
        res.status(200).json({
            message: "Book retrieved successfully",
            status: true,
            data: book,
        });
    }
    catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
exports.getBookById = getBookById;
// Controller to update a book by ID
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { price, quantity } = req.body;
        if (!price && !quantity) {
            res.status(400).json({
                message: "Price or quantity is required to update",
                status: false,
            });
            return;
        }
        // Call the service to update the book
        const updatedBook = yield (0, book_service_1.updateBookService)(productId, { price, quantity });
        if (!updatedBook) {
            res.status(404).json({
                message: "Book not found",
                status: false,
                data: null,
            });
            return;
        }
        // Return the updated book data
        res.status(200).json({
            message: "Book updated successfully",
            status: true,
            data: updatedBook,
        });
    }
    catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
exports.updateBook = updateBook;
// Controller to delete a book by ID
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // Call the service to delete the book
        const deletedBook = yield (0, book_service_1.deleteBookService)(productId);
        if (!deletedBook) {
            res.status(404).json({
                message: "Book not found",
                status: false,
                data: null,
            });
            return;
        }
        // Return a success message
        res.status(200).json({
            message: "Book deleted successfully",
            status: true,
            data: {},
        });
    }
    catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
exports.deleteBook = deleteBook;
