import { Request, Response, NextFunction } from "express";
import {
    createBookService,
    getAllBooksService,
    getBookByIdService,
    updateBookService,
    deleteBookService,
} from "../services/book.service";
import {TBook} from "../models/book.model";

// Controller to handle book creation
export const createBook = async (
    req: Request<{}, {}, TBook, {}>,
    res: Response,
    next: NextFunction
): Promise<void> => {
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
        const book = await createBookService({
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

        // Call the service to get all books
        const books = await getAllBooksService(searchTerm);

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
        const { productId } = req.params;

        // Call the service to get a book by ID
        const book = await getBookByIdService(productId);

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
        const updatedBook = await updateBookService(productId, { price, quantity });

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
        const { productId } = req.params;

        // Call the service to delete the book
        const deletedBook = await deleteBookService(productId);

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
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};
