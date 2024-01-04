import express from 'express';
import bodyParser from 'body-parser';
import apiController from '../controllers/apiController';

const router = express.Router();
/**
 * @param {*} app - express app
 */

const initApiRoutes = (app) => {

    // [GET] /api/v1/testApi
    router.get("/testApi", apiController.testApi);

    // [POST] /api/v1/register
    router.post("/register", apiController.handleRegister);

    //Website starts at "/api/v1"
    return app.use("/api/v1", router);
}
export default initApiRoutes;