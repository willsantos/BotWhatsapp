import whatsapp from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsapp;

import qrterminal from 'qrcode-terminal';
const { terminal: qrcode } = qrterminal;

class WhatsappService {

  constructor(options) {
    this.authStrategy = options.authStrategy || new LocalAuth();
    this.client = null;
  }

  initialize() {
    this.client = new Client({
      authStrategy: this.authStrategy,
    });

    this.client.on('qr', qr => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('Conta conectada com sucesso!');
      //Precisa aguardar essa mensagem antes de executar requisições
    });

    this.client.initialize();

  }


}

export default WhatsappService;