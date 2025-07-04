import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export default function timeValueMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { duracao_total, duracao } = req.body;

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

  const validateTime = (value: string, field: string) => {
    if (!timeRegex.test(value)) {
      throw new AppError(
        `Formato inválido para '${field}', utilize 'HH:mm' ou 'HH:mm:ss'`
      );
    }

    const [hours, minutes, secondsRaw = "00"] = value.split(":");
    const hoursNum = Number(hours);
    const minutesNum = Number(minutes);
    const secondsNum = Number(secondsRaw);

    if (
      hoursNum > 23 ||
      minutesNum > 59 ||
      (secondsRaw !== undefined && secondsNum > 59)
    ) {
      throw new AppError(
        `Duração inválida para '${field}'. Verifique se os valores estão dentro dos limites.`
      );
    }
  };

  if (duracao_total) {
    validateTime(duracao_total, "duracao_total");
  }

  if (duracao) {
    validateTime(duracao, "duracao");
  }

  next();
}
