import express from 'express';
import bodyParser from 'body-parser';
import apiController from '../controllers/apiController';
import groupController from '../controllers/groupController';

import userController from '../controllers/userController';

import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';

const router = express.Router();
/**
 * @param {*} app - express app
 */

// req => middleware (return to reject req or next to go to res) => res

const initApiRoutes = (app) => {
    // Apply 2 middlewares to all routes
    router.all('*', checkUserJWT, checkUserPermission);

    // [GET] /api/v1/testApi
    router.get("/testApi", apiController.testApi);

    // [POST] /api/v1/register
    router.post("/register", apiController.handleRegister);

    // [POST] /api/v1/login
    router.post("/login", apiController.handleLogin);

    // [POST] /api/v1/logout
    router.post("/logout", apiController.handleLogout);

    // [GET] /api/v1/account
    router.get("/account", userController.getUserAccount);

    //-------------User------------
    // CRUD User (Restful API)
    // [GET] /api/v1/user/read
    router.get("/user/read", userController.readFunc);

    // [POST] /api/v1/user/create
    router.post("/user/create", userController.createFunc);

    // [PUT] /api/v1/user/update
    router.put("/user/update", userController.updateFunc);

    // [DELETE] /api/v1/user/delete
    router.delete("/user/delete", userController.deleteFunc);

    //-------------GROUP------------
    //[GET] /api/v1/group/read
    router.get("/group/read", groupController.readFunc);

    //Website starts at "/api/v1"
    return app.use("/api/v1", router);
}
export default initApiRoutes;