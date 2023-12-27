import express from 'express';
import homeController from '../controllers/homeController';


const router = express.Router();
/**
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHome);
    router.get("/about", homeController.handleAbout);

    //Website starts at "/"
    return app.use("/", router);
}
export default initWebRoutes;