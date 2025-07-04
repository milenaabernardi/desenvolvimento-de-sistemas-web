import musicaRouter from "@modules/musica/routes/musica.routes";
import playlistRouter from "@modules/playlist/routes/playlists.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profiles.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use('/playlists', playlistRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profiles', profileRouter);
routes.use('/musicas', musicaRouter);

export default routes;