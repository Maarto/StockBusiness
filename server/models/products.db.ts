import { Schema, model } from 'mongoose';

let infoProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

let productSchema = new Schema({
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

export default model('Product', productSchema);