"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
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
    email: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("User", userSchema);
