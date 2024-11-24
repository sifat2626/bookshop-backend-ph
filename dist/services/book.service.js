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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.updateBookService = exports.getBookByIdService = exports.getAllBooksService = exports.createBookService = void 0;
const book_model_1 = __importDefault(require("../models/book.model")); // Assuming you have a Book model
// Service to create a new book
const createBookService = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, price, category, description, quantity, inStock } = bookData;
    // Create a new book
    const book = new book_model_1.default({
        title,
        author,
        price,
        category,
        description,
        quantity,
        inStock,
    });
    // Save book to database
    yield book.save();
    return book;
});
exports.createBookService = createBookService;
// Service to get all books or books by a search term
const getAllBooksService = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    // If searchTerm is provided, find books based on title, author, or category
    if (searchTerm) {
        query = {
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
            ]
        };
    }
    // Retrieve books from the database
    const books = yield book_model_1.default.find(query);
    return books;
});
exports.getAllBooksService = getAllBooksService;
// Service to get a specific book by ID
const getBookByIdService = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the book by ID
    const book = yield book_model_1.default.findById(productId);
    return book;
});
exports.getBookByIdService = getBookByIdService;
// Service to update a book by ID
const updateBookService = (productId, updateData // Allow updating any field
) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the book by ID and update the fields
    const updatedBook = yield book_model_1.default.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true } // Return the updated book and validate
    );
    return updatedBook;
});
exports.updateBookService = updateBookService;
// Service to delete a book by ID
const deleteBookService = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find and delete the book by ID
    const deletedBook = yield book_model_1.default.findByIdAndDelete(productId);
    return deletedBook;
});
exports.deleteBookService = deleteBookService;
