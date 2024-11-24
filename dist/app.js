"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware configurations
app.use((0, cors_1.default)({
    origin: [
        "https://tietheknot-3a6f0.web.app",
        "http://localhost:5173",
    ],
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use((0, hpp_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
// Routes middleware
// fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
//     const route = require(`./routes/${file}`);
//     app.use("/api", route);
// });
app.use("/api/products", book_route_1.default); // Mount the book routes under /api/v1
app.use("/api/orders", order_route_1.default); // Mount the book routes under /api/v1
app.use(errorHandler_1.default);
exports.default = app;
