import Book from "../models/book.model"; // Import the Book model
import Order from "../models/order.model"; // Import the Order model

// Function to create an order
export const createOrderService = async (
    email: string,
    productId: string,
    quantity: number,
    totalPrice: number
): Promise<any> => {
    // Find the book by product ID
    const book = await Book.findById(productId);
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
    await book.save();

    // Create a new order
    const order = new Order({
        email,
        product: productId,
        quantity,
        totalPrice,
    });

    // Save the order to the database
    await order.save();

    return order;
};

// Function to calculate the total revenue from all orders
export const calculateRevenueService = async (): Promise<number> => {
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
        return 0;
    }

    return revenueData[0].totalRevenue;
};
