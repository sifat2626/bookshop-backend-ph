import express from "express";
import {createBook, deleteBook, getAllBooks, getBookById, updateBook} from "../controllers/book.controller"; // Import the controller

const router = express.Router();

// Define route for creating a book
router.post("/", createBook);

// Route for getting all books or books based on a search term
router.get("/", getAllBooks);

// Route for getting a specific book by its ID
router.get("/:productId", getBookById);

// Route for updating a specific book by its ID
router.put("/:productId", updateBook);

// Route for deleting a specific book by its ID
router.delete("/:productId", deleteBook);

// You can add more routes like this
// router.get("/products/:id", getBook);  // For getting a single book by id

export default router;
