"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let infoProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
let productSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    info: {
        type: infoProductSchema,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    cuantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: false,
        default: "No subcategory"
    },
    brand: {
        type: String,
        required: false,
        default: "No brand"
    },
    model: {
        type: String,
        required: false,
        default: "No model"
    },
    color: {
        type: String,
        required: false,
        default: "No color"
    },
    size: {
        type: String,
        required: false,
        default: "No size"
    },
    weight: {
        type: String,
        required: false,
        default: "No weight"
    }
});
exports.default = (0, mongoose_1.model)('Product', productSchema);
