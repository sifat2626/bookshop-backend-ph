import mongoose, { Schema } from "mongoose";

export type TOrder = {
    email: string;
    product: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;
};

const orderSchema = new Schema<TOrder>(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Product reference is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be at least 1"],
        },
        totalPrice: {
            type: Number,
            required: [true, "Total price is required"],
            min: [0, "Total price cannot be negative"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Pre-save hook to compute totalPrice
orderSchema.pre("save", async function (next) {
    if (!this.isModified("quantity")) return next();

    const product = await mongoose.model("Book").findById(this.product);
    if (!product) {
        return next(new Error("Product not found"));
    }

    this.totalPrice = product.price * this.quantity;
    next();
});

const Order = mongoose.model<TOrder>("Order", orderSchema);

export default Order;
