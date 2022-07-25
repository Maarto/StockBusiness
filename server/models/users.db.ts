import { Schema, model } from "mongoose";

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
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
}, {versionKey: false});

export default model("User", userSchema);