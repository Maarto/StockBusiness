import { Request, Response } from 'express';
import db from '../models/users.db';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import 'dotenv/config'
import jwt from 'jsonwebtoken';

async function validateUser(req: Request, res: Response) {

    let user = await db.findOne({username: req.body.username});

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    let isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
        res.status(401).send('Invalid password');
        return;
    }

    try {

        let token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
            expiresIn: '1h'
        })

        res.status(200).json({
            status: 'success',
            data: {
                token: token,
                user: user
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err
        })
    }


}

async function postUser(req: Request, res: Response) {

    let schemaUser = Joi.object({
        username: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        createdAt: Joi.date().default(Date.now),
        updatedAt: Joi.date().default(Date.now),
        email: Joi.string().min(6).max(255).required(),
        role: Joi.array().required().default(['user']),
        avatar: Joi.string().min(6).max(1024).required()
    })

    let { error } = schemaUser.validate(req.body);

    if (error) {

        res.status(400).json({
            status: 'error',
            message: error.details[0].message
        })
        return;
    }

    let isMailExist = await db.findOne({ email: req.body.email });

    if (isMailExist) {
        res.status(400).json({
            status: 'error',
            message: 'Email already exist'
        })
        return;
    }

    let isUsernameExist = await db.findOne({ username: req.body.username });

    if (isUsernameExist) {
        res.status(400).json({
            status: 'error',
            message: 'Username already exist'
        })
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    let user = new db({
        username: req.body.username,
        password: password,
        email: req.body.email,
        role: req.body.role,
        avatar: req.body.avatar
    })

    try {
        await user.save();
        res.status(200).json({
            status: 'success',
            data: user
        })

    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err
        })
    }
}

async function getUser(req: Request, res: Response) {
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
            let user = await db.findOne({ id: req.params.id });

            if (user === null) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.json({
                    status: 'Success',
                    data: user
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

async function putUser(req: Request, res: Response) {

    let user = await db.findOne({ id: req.params.id });
    if (!user) {
        res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    try {
        let updatedUser = await db.updateOne({ id: req.params.id }, { $set: req.body, updatedAt: Date.now() });
        res.status(200).json({
            status: 'success',
            data: updatedUser
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err
        })
    }

}

async function deleteUser(req: Request, res: Response) {

    let user = await db.findOne({ id: req.params.id });

    if (!user) {
        res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
        return;
    }

    try {

        let deletedUser = await db.deleteOne({ id: req.params.id });

        res.status(200).json({
            status: 'success',
            data: deletedUser
        })


    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err
        })
    }
}

export { postUser, getUser, putUser, deleteUser, validateUser };