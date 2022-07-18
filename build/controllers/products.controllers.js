"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducts = exports.putProducts = exports.postProducts = exports.getProducts = void 0;
const products_db_1 = __importDefault(require("../models/products.db"));
async function getProducts(req, res) {
    try {
        let result = await products_db_1.default.find().exec();
        res.json({
            status: 'success',
            data: result
        });
    }
    catch (err) {
        res.json({
            status: 'error',
            message: err
        });
    }
}
exports.getProducts = getProducts;
function postProducts(req, res) {
    res.send('postProducts');
}
exports.postProducts = postProducts;
function putProducts(req, res) {
    res.send('putProducts');
}
exports.putProducts = putProducts;
function deleteProducts(req, res) {
    res.send('deleteProducts');
}
exports.deleteProducts = deleteProducts;
