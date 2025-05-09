import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from '@shared/http/middleware/isAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController(); // instanciando a classe

productsRouter.get('/', isAuthenticated, async (req, res, next) => {
  try {
    await productsController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

productsRouter.get('/:id', isAuthenticated, celebrate({[Segments.PARAMS] : {id : Joi.string().uuid().required()}}), async (req, res, next) => {
  try {
    await productsController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

productsRouter.post("/", isAuthenticated, celebrate({[Segments.BODY] : {name: Joi.string().required(), price: Joi.number().precision(2).required(), quantity: Joi.number().min(0).required()}}), async (req, res, next) => {
  try {
    await productsController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

productsRouter.put('/:id', isAuthenticated, celebrate({[Segments.PARAMS] : {id : Joi.string().uuid().required()}, [Segments.BODY] : {name: Joi.string().required(), price: Joi.number().min(0).precision(2).required(), quantity: Joi.number().required()}}),  async (req, res, next) => {
  try {
    await productsController.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

productsRouter.delete('/:id', isAuthenticated, celebrate({[Segments.PARAMS] : {id : Joi.string().uuid().required()}}), async (req, res, next) => {
  try {
    await productsController.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default productsRouter;