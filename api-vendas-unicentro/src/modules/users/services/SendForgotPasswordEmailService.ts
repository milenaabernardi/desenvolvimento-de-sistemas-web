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
    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await usersTokensRespository.generate(user.id);

    console.log(token);
    await EtherealMail.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[API VENDAS] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: 'http://localhost:3000/reset_password?tokens=${token} '
        },
      },
    });
  }
}