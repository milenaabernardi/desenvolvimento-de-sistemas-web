import { Router } from "express";
import MusicaController from "../controller/MusicaController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/middlewares/isAuthenticated";
import timeValueMiddleWare from "@shared/middlewares/timeValueMiddleWare";

const musicaRouter = Router();
const musicaController = new MusicaController();

musicaRouter.use(isAuthenticated);


musicaRouter.post('/', celebrate({
    [Segments.BODY]: {
        playlist_id: Joi.string().allow(null,''),
        titulo: Joi.string().required(),
        artista: Joi.string().required(),
        duracao: Joi.string().required(),
        genero: Joi.string().required(),
        ano_lancamento: Joi.number().integer()
    }
}), timeValueMiddleWare, async (req, res, next) => {
    try {
        await musicaController.create(req, res, next);
    } catch (error) {
        next(error);
    }
});
musicaRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try {
        await musicaController.show(req, res, next);
    } catch (error) {
        next(error)
    }
})
musicaRouter.get('/', async (req, res, next) => {
    try {
        await musicaController.index(req, res, next);
    } catch (error) {
        next(error);
    }
})
musicaRouter.get('/artista/:artista', celebrate({
    [Segments.PARAMS]: {
        artista: Joi.string().required()
    }
}), async (req, res, next) => {
    try {
        await musicaController.showByArtista(req, res, next);
    } catch (error) {
        next(error);
    }
})
musicaRouter.put('/:id', timeValueMiddleWare, celebrate({
    [Segments.BODY]: {
        playlist_id: Joi.string(),
        titulo: Joi.string().required(),
        artista: Joi.string().required(),
        duracao: Joi.string().required(),
        genero: Joi.string().required(),
        ano_lancamento: Joi.number().integer()
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try {
        await musicaController.update(req, res, next);
    } catch (error) {
        next(error);
    }
})
musicaRouter.patch('/:id', celebrate({
    [Segments.BODY]: {
        playlist_id: Joi.string().uuid().required(),
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try {
        await musicaController.updatePlaylist(req, res, next);
    } catch (error) {
        next(error);
    }
})
musicaRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try {
        await musicaController.delete(req, res, next);
    } catch (error) {
        next(error);
    }
})

export default musicaRouter;