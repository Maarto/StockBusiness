"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
async function connectDatabase() {
    try {
        mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6iud4.mongodb.net/test`);
        console.log('Database connected');
    }
    catch (err) {
        console.log(err);
    }
}
exports.default = connectDatabase;
