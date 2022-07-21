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
exports.deleteProducts = exports.putProducts = exports.postProducts = exports.getProducts = void 0;
const products_db_1 = __importDefault(require("../models/products.db"));
const joi_1 = __importDefault(require("@hapi/joi"));
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let products = yield products_db_1.default.find().exec();
        if (req.params.id === 'all') {
            res.json({
                status: "Success",
                data: products
            });
            return;
        }
        if (req.params.id) {
            try {
                let product = yield products_db_1.default.findOne({ id: req.params.id });
                if (product === null) {
                    res.status(404).send({ message: "Product not found" });
                }
                else {
                    res.json({
                        status: 'Success',
                        data: product
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
exports.getProducts = getProducts;
function postProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Postear un producto
        let schemaProducts = joi_1.default.object({
            id: joi_1.default.string().required(),
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            createdAt: joi_1.default.date().default(Date.now),
            updatedAt: joi_1.default.date().default(Date.now),
            cuantity: joi_1.default.number().required(),
            price: joi_1.default.number().required(),
            image: joi_1.default.string().required(),
            category: joi_1.default.string().required()
        });
        let { error } = schemaProducts.validate(req.body);
        if (error) {
            res.json({
                status: 'error',
                message: error.details[0].message
            });
            return;
        }
        let searchID = yield products_db_1.default.findOne({ id: req.body.id });
        if (searchID) {
            res.json({
                status: 'error',
                message: 'El id del producto ya existe'
            });
            return;
        }
        /* Crear un producto
           Database schema:
             id: Identificador único // Required
            info: {
                name: Nombre del producto // Required
                description: Descripción del producto // Required
            },
            createdAt: Fecha de creación del producto // Default
            updatedAt: Fecha de actualización del producto // Default
            cuantity: Cantidad de productos // Required
            price: Precio del producto // Required
            image: Imagen del producto // Required
            category: Categoría del producto // Required
            subcategory: Subcategoría del producto
            brand: Marca del producto
            model: Modelo del producto
            color: Color del producto
        */
        let product = new products_db_1.default({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            createdAt: new Date(),
            updatedAt: new Date(),
            cuantity: req.body.cuantity,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category
        });
        try {
            let savedProduct = yield product.save();
            res.json({
                status: 'success',
                data: savedProduct
            });
        }
        catch (err) {
            res.json({
                status: 'error',
                message: err
            });
        }
        // res.send('postProducts');
    });
}
exports.postProducts = postProducts;
function putProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // res.send('putProducts');
        // Actualizar un producto
        let productFind = yield products_db_1.default.findOne({ id: req.params.id });
        if (productFind === null) {
            res.json({
                status: 'error',
                message: 'Product not found'
            });
            return;
        }
        let allProudcts = yield products_db_1.default.find().exec();
        let isProductSame = allProudcts.find(product => product.id === req.body.id);
        if (isProductSame) {
            res.json({
                status: 'error',
                message: 'El id nuevo que quieres colocar ya existe.'
            });
            return;
        }
        ;
        try {
            console.log(req.body);
            // let updatedProduct = await db.updateOne({ id: req.params.id }, {
            //     $set: {
            //         id: req.body.id ? req.body.id : productFind.id,
            //         info: {
            //             name: req.body.info.name ? req.body.info.name : productFind.info.name,
            //             description: req.body.info.description ? req.body.info.description : productFind.info.description
            //         },
            //         createdAt: req.body.createdAt ? req.body.createdAt : productFind.createdAt,
            //         updatedAt: new Date(),
            //         cuantity: req.body.cuantity ? req.body.cuantity : productFind.cuantity,
            //         price: req.body.price ? req.body.price : productFind.price,
            //         image: req.body.image ? req.body.image : productFind.image,
            //         category: req.body.category ? req.body.category : productFind.category
            //     }
            // });
            let updatedProduct = yield products_db_1.default.updateOne({ id: req.params.id }, {
                $set: req.body,
                $currentDate: {
                    updatedAt: true
                }
            });
            res.json({
                status: 'success',
                data: updatedProduct
            });
        }
        catch (err) {
            res.json({
                status: 'error',
                message: err
            });
        }
    });
}
exports.putProducts = putProducts;
function deleteProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Eliminar un producto
        let isProductExist = yield products_db_1.default.findOne({ id: req.params.id });
        if (isProductExist === null) {
            res.json({
                status: 'error',
                message: 'Product not found'
            });
            return;
        }
        try {
            let deletedProduct = yield products_db_1.default.deleteOne({ id: req.params.id });
            res.json({
                status: 'success',
                data: deletedProduct
            });
        }
        catch (err) {
            res.json({
                status: 'error',
                message: err
            });
        }
    });
}
exports.deleteProducts = deleteProducts;
