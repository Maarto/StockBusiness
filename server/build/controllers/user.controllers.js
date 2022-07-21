"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.getUser = exports.postUser = void 0;
const users_db_1 = __importDefault(require("../models/users.db"));
const joi_1 = __importDefault(require("@hapi/joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function postUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let schemaUser = joi_1.default.object({
            id: joi_1.default.string().required(),
            username: joi_1.default.string().min(6).max(255).required(),
            password: joi_1.default.string().min(6).max(1024).required(),
            createdAt: joi_1.default.date().default(Date.now),
            updatedAt: joi_1.default.date().default(Date.now),
            email: joi_1.default.string().min(6).max(255).required(),
            role: joi_1.default.array().required().default(['user']),
            image: joi_1.default.string().min(6).max(1024).required()
        });
        let { error } = schemaUser.validate(req.body);
        if (error) {
            res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
            return;
        }
        let isMailExist = yield users_db_1.default.findOne({ email: req.body.email });
        if (isMailExist) {
            res.status(400).json({
                status: 'error',
                message: 'Email already exist'
            });
            return;
        }
        let isUsernameExist = yield users_db_1.default.findOne({ username: req.body.username });
        if (isUsernameExist) {
            res.status(400).json({
                status: 'error',
                message: 'Username already exist'
            });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const password = yield bcrypt_1.default.hash(req.body.password, salt);
        let user = new users_db_1.default({
            id: req.body.username + req.body.email,
            username: req.body.username,
            password: password,
            email: req.body.email,
            role: req.body.role,
            image: req.body.image
        });
        try {
            yield user.save();
            res.status(200).json({
                status: 'success',
                data: user
            });
        }
        catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    });
}
exports.postUser = postUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let products = yield users_db_1.default.find().exec();
        if (req.params.id === 'all') {
            res.json({
                status: "Success",
                data: products
            });
            return;
        }
        if (req.params.id) {
            try {
                let user = yield users_db_1.default.findOne({ id: req.params.id });
                if (user === null) {
                    res.status(404).send({ message: "User not found" });
                }
                else {
                    res.json({
                        status: 'Success',
                        data: user
                    });
                }
            }
            catch (err) {
                res.json({
                    status: 'error',
                    message: err
                });
            }
        }
    });
}
exports.getUser = getUser;
function putUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield users_db_1.default.findOne({ id: req.params.id });
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        try {
            let updatedUser = yield users_db_1.default.updateOne({ id: req.params.id }, { $set: req.body, updatedAt: Date.now() });
            res.status(200).json({
                status: 'success',
                data: updatedUser
            });
        }
        catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    });
}
exports.putUser = putUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield users_db_1.default.findOne({ id: req.params.id });
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
            return;
        }
        try {
            let deletedUser = yield users_db_1.default.deleteOne({ id: req.params.id });
            res.status(200).json({
                status: 'success',
                data: deletedUser
            });
        }
        catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    });
}
exports.deleteUser = deleteUser;
