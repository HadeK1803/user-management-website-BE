import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';

import configCORS from './config/cors';
import connection from './config/connectDB';

import cookieParser from 'cookie-parser';

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

//config cookie-parser
app.use(cookieParser())

//init web routes
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    res.send('404 NOT FOUND!');
})
app.listen(PORT, () => {
    console.log(">>> NodeJS server is listening on port " + PORT);
})