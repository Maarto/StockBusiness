"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducts = exports.putProducts = exports.postProducts = exports.getProducts = void 0;
const testingdb_db_1 = __importDefault(require("../models/testingdb.db"));
async function getProducts(req, res) {
    res.send("getProducts");
    // try {
    //     let result = await db.find().exec();
    //     res.json({
    //         status: 'success',
    //         data: result
    //     })
    // } catch (err) {
    //     res.json({
    //         status: 'error',
    //         message: err
    //     })
    // }
}
exports.getProducts = getProducts;
async function postProducts(req, res) {
    // Postear un producto
    let obj = {
        name: req.body.name,
        description: req.body.description
    };
    let result = new testingdb_db_1.default({
        name: obj.name,
        description: obj.description
    });
    try {
        let savedResult = await result.save();
        res.json({
            status: 'success',
            data: savedResult
        });
    }
    catch (err) {
        res.json({
            status: 'error',
            message: err
        });
    }
    // res.send('postProducts');
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
