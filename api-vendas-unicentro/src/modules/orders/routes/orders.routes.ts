import isAuthenticated from "@shared/http/middleware/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import OrdersController from "../controllers/OrdersController";


const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get("/", async (req, res, next) => {
    try {
        await ordersController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});
ordersRouter.get("/:id", celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }), async (req, res, next) => {
    try {
        await ordersController.show(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

ordersRouter.post("/", celebrate({
    [Segments.BODY]: {
        customer_id: Joi.string().required(),
        products: Joi.required()
    }
}), async (req, res, next) => {
    try {
        await ordersController.create(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

export default ordersRouter;