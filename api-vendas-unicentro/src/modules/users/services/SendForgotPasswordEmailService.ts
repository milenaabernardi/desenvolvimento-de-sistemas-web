
import { getCustomRepository } from "typeorm";
import path from 'path';
import UsersRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "@shared/http/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {

  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRespository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await usersTokensRespository.generate(user.id);

    //futuramente vamos implementar o método de enviar isso para o email.
    console.log(token);
    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token} `
    })
  }
}