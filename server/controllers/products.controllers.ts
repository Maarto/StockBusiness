import { Response, Request } from 'express';
import db from '../models/products.db'
import tdb from '../models/testingdb.db'

async function getProducts(req: Request, res: Response) {

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

async function postProducts(req: Request, res: Response) {

    // Postear un producto

    let obj = {
        name: req.body.name,
        description: req.body.description
    }

    let result = new tdb({
        name: obj.name,
        description: obj.description
    })

    try {
        let savedResult = await result.save();
        res.json({
            status: 'success',
            data: savedResult
        })
    } catch (err) {
        res.json({
            status: 'error',
            message: err
        })
    }

    // res.send('postProducts');
}

function putProducts(req: Request, res: Response) {
    res.send('putProducts');
}

function deleteProducts(req: Request, res: Response) {
    res.send('deleteProducts');
}

export { getProducts, postProducts, putProducts, deleteProducts };