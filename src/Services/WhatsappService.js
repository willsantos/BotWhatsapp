import whatsapp from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsapp;
import qrcode from 'qrcode-terminal';

class WhatsappService {

  constructor(options) {

    this.authStrategy = options.authStrategy || new LocalAuth();
    this.client = null;
  }

  connect() {

    this.client = new Client({
      authStrategy: this.authStrategy,
      puppeteer: {
        args: ['--no-sandbox'],
      }
    });


    this.client.on('qr', qr => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('Conta conectada com sucesso!');
    });

    this.client.initialize()

  }

}

export default WhatsappService;