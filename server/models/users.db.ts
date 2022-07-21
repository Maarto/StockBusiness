import { Schema, model } from "mongoose";

let userSchema = new Schema({
    id: {
        type: String,
        required: true

    },
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
    image: {
        type: String,
        required: true
    }
});

export default model("User", userSchema);