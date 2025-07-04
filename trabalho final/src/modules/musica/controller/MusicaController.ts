import { NextFunction, Request, Response } from "express";

import CreateMusicaService from "../services/CreateMusicaService";
import ListMusicaService from "../services/ListMusicaService";
import ShowMusicaService from "../services/ShowMusicaService";
import ListMusicaByArtistaService from "../services/ListMusicaByArtistaService";
import UpdateMusicaService from "../services/UpdateMusicaService";
import UpdatePlaylistMusicaService from "../services/UpdatePlaylistMusicaService";
import DeleteMusicaService from "../services/DeleteMusicaService";

export default class MusicaController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const {
        playlist_id,
        titulo,
        artista,
        duracao,
        genero,
        ano_lancamento,
      } = request.body;

      const createMusica = new CreateMusicaService();

      const musica = await createMusica.execute({
        playlist_id,
        titulo,
        artista,
        duracao,
        genero,
        ano_lancamento,
      });

      return response.json(musica);
    } catch (error) {
      next(error);
    }
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const showMusica = new ShowMusicaService();
      const musica = await showMusica.execute({ id });

      return response.json(musica);
    } catch (error) {
      next(error);
    }
  }

  public async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const listMusica = new ListMusicaService();
      const musicas = await listMusica.execute();

      return response.json(musicas);
    } catch (error) {
      next(error);
    }
  }

  public async showByArtista(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { artista } = request.params;

      const listMusicaArtista = new ListMusicaByArtistaService();
      const musicas = await listMusicaArtista.execute({ artista });

      return response.json(musicas);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;
      const {
        playlist_id,
        titulo,
        artista,
        duracao,
        genero,
        ano_lancamento,
      } = request.body;

      const updateMusica = new UpdateMusicaService();
      const musica = await updateMusica.execute({
        id,
        playlist_id,
        titulo,
        artista,
        duracao,
        genero,
        ano_lancamento,
      });

      return response.json(musica);
    } catch (error) {
      next(error);
    }
  }

  public async updatePlaylist(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;
      const { playlist_id } = request.body;

      const updateMusicaPlaylist = new UpdatePlaylistMusicaService();
      const musica = await updateMusicaPlaylist.execute({
        id,
        playlist_id,
      });

      return response.json(musica);
    } catch (error) {
      next(error);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const deleteMusica = new DeleteMusicaService();
      await deleteMusica.execute({ id });

      return response.json([]);
    } catch (error) {
      next(error);
    }
  }
}
