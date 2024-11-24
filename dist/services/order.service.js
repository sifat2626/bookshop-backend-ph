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
exports.calculateRevenueService = exports.createOrderService = void 0;
const book_model_1 = __importDefault(require("../models/book.model")); // Import the Book model
const order_model_1 = __importDefault(require("../models/order.model")); // Import the Order model
// Function to create an order
const createOrderService = (email, productId, quantity, totalPrice) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the book by product ID
    const book = yield book_model_1.default.findById(productId);
    if (!book) {
        throw new Error("Book not found");
    }
    // Check if there is enough stock for the order
    if (book.quantity < quantity) {
        throw new Error("Insufficient stock");
    }
    // Reduce the quantity of the book in the inventory
    book.quantity -= quantity;
    // If the stock goes to zero, set inStock to false
    if (book.quantity === 0) {
        book.inStock = false;
    }
    // Save the updated book inventory
    yield book.save();
    // Create a new order
    const order = new order_model_1.default({
        email,
        product: productId,
        quantity,
        totalPrice,
    });
    // Save the order to the database
    yield order.save();
    return order;
});
exports.createOrderService = createOrderService;
// Function to calculate the total revenue from all orders
const calculateRevenueService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Aggregate the total revenue from all orders
    const revenueData = yield order_model_1.default.aggregate([
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
        return 0;
    }
    return revenueData[0].totalRevenue;
});
exports.calculateRevenueService = calculateRevenueService;
