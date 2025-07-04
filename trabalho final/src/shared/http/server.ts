import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import cors from "cors";
import routes from "./routes";
import "@shared/typeorm";
import AppError from "@shared/errors/AppError";
import {errors} from 'celebrate';
import uploadConfig from "@config/upload"

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files',express.static(uploadConfig.directory))
app.use(routes);
app.use(errors())
app.use((error: Error, request: Request, response: Response, next: NextFunction): void => {
    console.log("erro: " + error);
    if (error instanceof AppError) {
        response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

app.listen(3333, () => {
    console.log("Server started on port 3333")
})