import Book, { TBook } from "../models/book.model"; // Assuming you have a Book model

// Service to create a new book
export const createBookService = async (bookData: TBook): Promise<any> => {
    const { title, author, price, category, description, quantity, inStock } = bookData;

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

    return book;
};

// Service to get all books or books by a search term
export const getAllBooksService = async (searchTerm?: string): Promise<any> => {
    let query: any = {};

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
    const books = await Book.find(query);

    return books;
};

// Service to get a specific book by ID
export const getBookByIdService = async (productId: string): Promise<any> => {
    // Find the book by ID
    const book = await Book.findById(productId);
    return book;
};

// Service to update a book by ID
export const updateBookService = async (
    productId: string,
    updateData: { price?: number, quantity?: number }
): Promise<any> => {
    // Find the book by ID and update the fields
    const updatedBook = await Book.findByIdAndUpdate(
        productId,
        updateData,
        { new: true, runValidators: true } // Return the updated book and validate
    );

    return updatedBook;
};

// Service to delete a book by ID
export const deleteBookService = async (productId: string): Promise<any> => {
    // Find and delete the book by ID
    const deletedBook = await Book.findByIdAndDelete(productId);
    return deletedBook;
};
