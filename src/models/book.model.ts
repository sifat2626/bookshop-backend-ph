import mongoose, { Schema } from "mongoose";

export type TBook = {
    title: string;
    author: string;
    price: number;
    category: "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";
    description: string;
    quantity: number;
    inStock: boolean;
};

const bookSchema = new Schema<TBook>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters long"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
            minlength: [2, "Author name must be at least 2 characters long"],
            maxlength: [50, "Author name cannot exceed 50 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        category: {
            type: String,
            enum: {
                values: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
                message: "Category must be one of: Fiction, Science, SelfDevelopment, Poetry, Religious",
            },
            required: [true, "Category is required"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Quantity cannot be negative"],
        },
        inStock: {
            type: Boolean,
            required: [true, "InStock status is required"],
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Adding a pre-save hook to ensure `inStock` reflects the `quantity`
bookSchema.pre("save", function (next) {
    this.inStock = this.quantity > 0;
    next();
});

const Book = mongoose.model<TBook>("Book", bookSchema);

export default Book;
