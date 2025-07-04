import { Router } from "express";
import PlaylistController from "../controllers/PlaylistController";
import { celebrate, Joi, Segments } from "celebrate";
import timeValueMiddleWare from "@shared/middlewares/timeValueMiddleWare";
import isAuthenticated from "@shared/middlewares/isAuthenticated";

const playlistRouter = Router()
const playlistController = new PlaylistController
playlistRouter.use(isAuthenticated)

playlistRouter.get('/criador/:criador', celebrate({
    [Segments.PARAMS]: {
        criador: Joi.string().required()
    }
}), async (req, res, next) => {
    try {
        await playlistController.findAllByCriador(req, res, next);
    } catch (error) {
        next(error);
    }
});
playlistRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try {
        await playlistController.show(req, res, next);
    } catch (error) {
        next(error);
    }
});
playlistRouter.post('/', celebrate({
    [Segments.BODY]: {
        nome: Joi.string().required(),
        criador: Joi.string().required(),
        genero: Joi.string().required(),
        duracao_total: Joi.string().required(),
        descricao: Joi.string().required()
    }
}), timeValueMiddleWare, async (req, res, next) => {
    try {
        await playlistController.create(req, res, next);
    } catch (error) {
        next(error);
    }
});
playlistRouter.put('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        nome: Joi.string().required(),
        criador: Joi.string().required(),
        genero: Joi.string().required(),
        duracao_total: Joi.string().required(),
        descricao: Joi.string().required()
    }
}), timeValueMiddleWare, async (req, res, next) => {
    try {
        await playlistController.edit(req, res, next);
    } catch (error) {
        next(error);
    }
});
playlistRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try {
        await playlistController.delete(req, res, next);
    } catch (error) {
        next(error);
    }
})

export default playlistRouter;

