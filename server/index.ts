/**
* @Client & @StockController
* @Developed by: @Marto
*/

// Importing the required modules

import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDatabase  from './db/startDB'
let app = express();

import productsRoutes from './routes/products.routes';
import userRoutes from './routes/user.routes';

// Cors configuration

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(productsRoutes);

// Connection to DataBase

connectDatabase();

// App Online

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});