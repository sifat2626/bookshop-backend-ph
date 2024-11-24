"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bookSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
// Adding a pre-save hook to ensure `inStock` reflects the `quantity`
bookSchema.pre("save", function (next) {
    this.inStock = this.quantity > 0;
    next();
});
const Book = mongoose_1.default.model("Book", bookSchema);
exports.default = Book;
