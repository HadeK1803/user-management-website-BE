import express from 'express';
import homeController from '../controllers/homeController';
import bodyParser from 'body-parser';
import apiController from '../controllers/apiController';

const router = express.Router();
/**
 * @param {*} app - express app
 */

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHome);
    router.get("/user", homeController.handleUser);

    router.post("/user/create", homeController.handleCreateNewUser);

    // [POST] /delete-user/:id
    router.post("/delete-user/:id", homeController.handleDeleteUser);

    // [GET] /update-user/:id
    router.get("/update-user/:id", homeController.handleUpdateUserPage);

    // [POST] /update-user
    router.post("/update-user", homeController.handleUpdateUser);

    //Website starts at "/"
    return app.use("/", router);
}
export default initWebRoutes;