import nodemailer from 'nodemailer';

interface ISendMail {
    to: string;
    body: string;
}

export default class EtherealMail {

    static async sendMail({ to, body }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const trasporter = nodemailer.createTransport({
            host: account.smtp.host, port: account.smtp.port,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
        const message = await trasporter.sendMail({
            from: 'equipe_vendas@apivendas.com.br',
            to,
            subject: 'Recuperação de senha',
            text: body,
        });
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}