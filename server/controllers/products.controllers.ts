import { Response, Request } from 'express';
import db from '../models/products.db'
import Joi from '@hapi/joi';

async function getProducts(req: Request, res: Response) {
    let products = await db.find().exec();

    if (req.params.id === 'all') {
        res.json({
            status: "Success",
            data: products
        })
        return;
    }

    if (req.params.id) {
        try {
            let product = await db.findOne({ id: req.params.id });

            if (product === null) {
                res.status(404).send({ message: "Product not found" });
            } else {
                res.json({
                    status: 'Success',
                    data: product
                })
            }
        } catch (err) {
            res.json({
                status: 'error',
                message: err
            })
        }
    }
}

async function postProducts(req: Request, res: Response) {
    // Postear un producto

    let schemaProducts = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        createdAt: Joi.date().default(Date.now),
        updatedAt: Joi.date().default(Date.now),
        cuantity: Joi.number().required(),
        price: Joi.number().required(),
        image: Joi.string().required(),
        category: Joi.string().required()
    });

    let { error } = schemaProducts.validate(req.body);

    if (error) {
        res.json({
            status: 'error',
            message: error.details[0].message
        })
        return;
    }

    let searchID = await db.findOne({ id: req.body.id });

    if (searchID) {
        res.json({
            status: 'error',
            message: 'El id del producto ya existe'
        })

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
    let product = new db({
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
        let savedProduct = await product.save();
        res.json({
            status: 'success',
            data: savedProduct
        })
    } catch (err) {
        res.json({
            status: 'error',
            message: err
        })
    }

    // res.send('postProducts');
}

async function putProducts(req: Request, res: Response) {
    // res.send('putProducts');

    // Actualizar un producto
    let productFind = await db.findOne({ id: req.params.id });

    if (productFind === null) {
        res.json({
            status: 'error',
            message: 'Product not found'
        })
        return;
    }

    let allProudcts = await db.find().exec();
    let isProductSame = allProudcts.find(product => product.id === req.body.id);
    if (isProductSame) {
        res.json({
            status: 'error',
            message: 'El id nuevo que quieres colocar ya existe.'
        })
        return;
    };


    try {

        console.log(req.body)

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

        let updatedProduct = await db.updateOne({ id: req.params.id }, {
            $set: req.body,
            $currentDate: {
                updatedAt: true
            }
        });

        res.json({
            status: 'success',
            data: updatedProduct
        })

    } catch (err) {
        res.json({
            status: 'error',
            message: err
        })
    }


}

async function deleteProducts(req: Request, res: Response) {

    // Eliminar un producto
    let isProductExist = await db.findOne({ id: req.params.id });

    if (isProductExist === null) {
        res.json({
            status: 'error',
            message: 'Product not found'
        })
        return;
    }

    try {
        let deletedProduct = await db.deleteOne({ id: req.params.id });
        res.json({
            status: 'success',
            data: deletedProduct
        })
    } catch (err) {
        res.json({
            status: 'error',
            message: err
        })
    }


}

export { getProducts, postProducts, putProducts, deleteProducts };