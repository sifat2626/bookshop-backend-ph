import { Request, Response, NextFunction } from "express";
import Book, {TBook} from "../models/book.model"; // Assuming you have a Book model

// Controller to handle book creation
export const createBook = async (
    req: Request<{}, {}, TBook, {}>, // Request with TBook body type
    res: Response,
    next: NextFunction
): Promise<void> => { // Controller should return `Promise<void>`
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

        // Create a new book
        const book = new Book({
            title,
            author,
            price,
            category,
            description,
            quantity,
            inStock,
        });

        // Save book to database
        await book.save();

        // Send response
        res.status(201).json({
            success: true,
            data: book,
        });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};


// Controller to get all books or books by a search term
export const getAllBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const searchTerm = req.query.searchTerm as string | undefined;

        let query: any = {};

        // If searchTerm is provided, find books based on title, author, or category
        if (searchTerm) {
            query = {
                $or: [
                    { title: { $regex: searchTerm, $options: "i" } },
                    { author: { $regex: searchTerm, $options: "i" } },
                    { category: { $regex: searchTerm, $options: "i" } }
                ]
            };
        }

        // Retrieve books from the database
        const books = await Book.find(query);

        // Return the response
        res.status(200).json({
            message: "Books retrieved successfully",
            status: true,
            data: books,
        });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

// Controller to get a specific book by ID
export const getBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { productId } = req.params; // Get the productId from route parameters

        // Find the book by ID
        const book = await Book.findById(productId);

        // If no book is found, return an error response
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
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

// Controller to update a book by ID
export const updateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { productId } = req.params; // Get the productId from route parameters
        const { price, quantity } = req.body; // Get the updated price and quantity from request body

        // Validate that at least one field to update is provided
        if (!price && !quantity) {
            res.status(400).json({
                message: "Price or quantity is required to update",
                status: false,
            });
            return;
        }

        // Find the book by ID and update the fields
        const book = await Book.findByIdAndUpdate(
            productId,
            { price, quantity }, // Fields to update
            { new: true, runValidators: true } // Return the updated book and validate
        );

        // If no book is found, return an error response
        if (!book) {
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
            data: book,
        });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

// Controller to delete a book by ID
export const deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { productId } = req.params; // Get the productId from route parameters

        // Find and delete the book by ID
        const book = await Book.findByIdAndDelete(productId);

        // If no book is found, return an error response
        if (!book) {
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
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};
