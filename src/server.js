import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';

import connection from './config/connectDB';

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;

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


app.listen(PORT, () => {
    console.log("NodeJS server is listening on port " + PORT);
})