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
exports.calculateRevenue = exports.createOrder = void 0;
const order_service_1 = require("../services/order.service");
// Controller to handle creating an order
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const order = yield (0, order_service_1.createOrderService)(email, product, quantity, totalPrice);
        // Return success response with the order details
        res.status(201).json({
            message: "Order created successfully",
            status: true,
            data: order,
        });
    }
    catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
exports.createOrder = createOrder;
// Controller to calculate total revenue from all orders
const calculateRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the service function to calculate revenue
        const totalRevenue = yield (0, order_service_1.calculateRevenueService)();
        // Return the total revenue in the response
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: { totalRevenue },
        });
    }
    catch (error) {
        next(error); // Pass error to the error handling middleware
    }
});
exports.calculateRevenue = calculateRevenue;
