import { Request, Response, NextFunction } from "express";
import { createOrderService, calculateRevenueService } from "../services/order.service";

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

        // Call the service function to create the order
        const order = await createOrderService(email, product, quantity, totalPrice);

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
        // Call the service function to calculate revenue
        const totalRevenue = await calculateRevenueService();

        // Return the total revenue in the response
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: { totalRevenue },
        });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};
