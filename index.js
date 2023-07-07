const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('message_create', message_create => {
    console.log(message_create)
})

client.on('ready', () => {
  console.log('Cliente pronto!');

  const contactId = '557197389935@c.us';
  const contact = client.getContactById(contactId);
  const contactName = contact.name;
  const message = `Boa tarde, ${contactName}! Por favor, escreva "Olá"`;


client.on('message', message => {
    if(message.body === 'Olá'){
        message.reply('Olá, eu sou o bot do Ministério de Música em construção')
    }
    else
        message.reply('Por favor, digite o comando correto para trocarmos ideia')
    }
)

    client.sendMessage(contactId, message)
})


client.initialize();
