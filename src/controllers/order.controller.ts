import { Request, Response, NextFunction } from "express";
import Book from "../models/book.model"; // Assuming the Book model is available
import Order from "../models/order.model"; // Assuming you have an Order model

// Controller to handle creating an order
export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, product, quantity, totalPrice } = req.body;

        // Validate the request body
        if (!email || !product || !quantity || !totalPrice) {
            res.status(400).json({
                message: "All fields are required: email, product, quantity, totalPrice",
                status: false,
                data: null,
            });
            return;
        }

        // Find the book by product ID
        const book = await Book.findById(product);
        if (!book) {
            res.status(404).json({
                message: "Book not found",
                status: false,
                data: null,
            });
            return;
        }

        // Check if there is enough stock for the order
        if (book.quantity < quantity) {
            res.status(400).json({
                message: "Insufficient stock",
                status: false,
                data: null,
            });
            return;
        }

        // Reduce the quantity of the book in the inventory
        book.quantity -= quantity;

        // If the stock goes to zero, set inStock to false
        if (book.quantity === 0) {
            book.inStock = false;
        }

        // Save the updated book inventory
        await book.save();

        // Create a new order
        const order = new Order({
            email,
            product,
            quantity,
            totalPrice,
        });

        // Save the order to the database
        await order.save();

        // Return success response with the order details
        res.status(201).json({
            message: "Order created successfully",
            status: true,
            data: order,
        });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

// Controller to calculate total revenue from all orders
export const calculateRevenue = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Aggregate the total revenue from all orders
        const revenueData = await Order.aggregate([
            {
                $lookup: {
                    from: "books", // The name of the collection in MongoDB
                    localField: "product", // Field from the Order model
                    foreignField: "_id", // Field from the Book model
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails", // Unwind the bookDetails array
            },
            {
                $project: {
                    totalRevenue: {
                        $multiply: ["$quantity", "$bookDetails.price"], // Multiply quantity by book price
                    },
                },
            },
            {
                $group: {
                    _id: null, // Grouping all results together
                    totalRevenue: { $sum: "$totalRevenue" }, // Sum up the total revenue
                },
            },
        ]);

        if (revenueData.length === 0) {
            res.status(200).json({
                message: "No orders found",
                status: true,
                data: {
                    totalRevenue: 0,
                },
            });
            return;
        }

        // Return the total revenue in the response
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: {
                totalRevenue: revenueData[0].totalRevenue,
            },
        });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};