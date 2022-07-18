"use strict";
/**
* @Client & @StockController
* @Developed by: @Marto
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the required modules
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
let app = (0, express_1.default)();
const products_routes_1 = __importDefault(require("./routes/products.routes"));
// Cors configuration
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(products_routes_1.default);
// App Online
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
