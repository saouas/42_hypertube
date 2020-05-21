import nodemailer from 'nodemailer';
import config, { mail_sender, web_app } from '../../config';

let transporter = nodemailer.createTransport(config.mail);

class MailService {
  static ask_reset_password(mail, username, token) {
    return new Promise((resolve, reject) => {
      const url = `${web_app.protocol}://${web_app.domain}/reset/${token}`;
      transporter.sendMail({
        from: mail_sender,
        to: mail,
        text: `Bonjour ${username}, \nVotre code de réinitialisation est ${token}.. ${url}`,
        html: `<h2>Bonjour ${username}</h2><p>Votre code de réinitialisation est ${token}</p><a href="${url}">Vous pouvez cliquer ici</a>`,
        subject: 'Demande de réinitialisation mot de passe Hypertube'
      })
      .then(() => {
        resolve()
      })
      .catch(reject);
    });
  }
}

export { MailService }