import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';

import configCORS from './config/cors';
import connection from './config/connectDB';

import { createJWT, verifyToken } from './middleware/JWTAction'

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;

//config CORS
configCORS(app);

// Config body parser
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//test connect db
connection();

//config view engine
configViewEngine(app);
//init web routes
initWebRoutes(app);
initApiRoutes(app);

//test JWT
createJWT();
let data = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVHJhbiBLaGFuZyIsImFkZHJlc3MiOiJEb25nIE5haSIsImlhdCI6MTcwNjc5MzUzNn0.ALXx1vMVwog4kBVimK7RBjhncS5oIknGUxp8faVMBL0');
console.log(data);


app.listen(PORT, () => {
    console.log("NodeJS server is listening on port " + PORT);
})