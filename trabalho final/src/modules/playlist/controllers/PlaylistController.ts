import { NextFunction, Request, Response } from "express";
import CreatePlaylistService from "../services/CreatePlaylistService";
import ListPlaylistServiceByCriador from "../services/ListPlaylistServiceByCriador";
import ShowPlaylistService from "../services/ShowPlaylistService";
import UpdatePlaylistService from "../services/UpdatePlaylistService";
import DeletePlaylistService from "../services/DeletePlaylistService";

export default class PlaylistController {
    public async create(
        request: Request, response: Response, next: NextFunction
    ): Promise<Response | undefined> {
        try {
            const { nome, criador, genero, duracao_total, descricao } = request.body;
            const createPlaylist = new CreatePlaylistService();
            const playlist = await createPlaylist.execute({ nome, criador, genero, duracao_total, descricao });

            return response.json(playlist);
        } catch (error) {
            next(error);
        }
    }

    public async findAllByCriador(
        request: Request, response: Response, next: NextFunction
    ): Promise<Response | undefined> {
        try {
            const { criador } = request.params;
            const findByCriadorPlaylist = new ListPlaylistServiceByCriador()
            const playlists = await findByCriadorPlaylist.execute({ criador });

            return response.json(playlists);
        } catch (error) {
            next(error);
        }
    }
    public async show(
        request: Request, response: Response, next: NextFunction
    ): Promise<Response | undefined> {
        try {
            const { id } = request.params;
            const showPlaylist = new ShowPlaylistService()
            const playlist = await showPlaylist.execute({ id });

            return response.json(playlist);
        } catch (error) {
            next(error)
        }
    }
    public async edit(
        request: Request, response: Response, next: NextFunction
    ): Promise<Response | undefined> {
        try {
            const { id } = request.params;
            const { nome, criador, genero, duracao_total, descricao } = request.body;
            const editPlaylist = new UpdatePlaylistService()
            const playlist = await editPlaylist.execute({ id, nome, criador, genero, duracao_total, descricao });
            return response.json(playlist);
        } catch (error) {
            next(error);
        }
    }

    public async delete(
        request: Request, response: Response, next: NextFunction
    ): Promise<Response | undefined> {
        try {
            const { id } = request.params;
            const deletePlaylist = new DeletePlaylistService()
            await deletePlaylist.execute({ id });

            return response.json([]);
        } catch (error) {
            next(error)
        }
    }
    


}