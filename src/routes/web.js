import express from 'express';
const router = express.Router();
/**
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.json("hello world");
    })
    return app.use("/", router);
}
export default initWebRoutes;