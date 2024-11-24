import express from "express";
import {calculateRevenue, createOrder} from "../controllers/order.controller";

const router = express.Router();

// Route for creating an order
router.post("/", createOrder);

// Route for calculating total revenue
router.get("/revenue", calculateRevenue);

export default router;
