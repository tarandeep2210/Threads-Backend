import express from 'express';
import routes from './src/routes/threadRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import fs from "fs";

const app = express();
const PORT = 3000;

//mongoose connection 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ThreadsDB');

//body parser setup

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.use(cors());

routes(app);


//serving static files  
app.use(express.static('public'));

app.get('/',(req,res) => 
res.send(`Node server is running on Port ${PORT}`)
);

app.listen(PORT , () =>
    console.log(`Server is running on port ${PORT}`) 
);