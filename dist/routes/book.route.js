"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller"); // Import the controller
const router = express_1.default.Router();
// Define route for creating a book
router.post("/", book_controller_1.createBook);
// Route for getting all books or books based on a search term
router.get("/", book_controller_1.getAllBooks);
// Route for getting a specific book by its ID
router.get("/:productId", book_controller_1.getBookById);
// Route for updating a specific book by its ID
router.put("/:productId", book_controller_1.updateBook);
// Route for deleting a specific book by its ID
router.delete("/:productId", book_controller_1.deleteBook);
// You can add more routes like this
// router.get("/products/:id", getBook);  // For getting a single book by id
exports.default = router;
