const express = require('express') //minimal web framework(gerencia a API)
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
require('dotenv').config(); //lê arquivos .env
const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.json());


function removerAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

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

  const contactId = '5511000000000@c.us';
  const contact = client.getContactById(contactId);
  const contactName = contact.name;
  const mensagem = `Boa tarde, ${contactId}! Por favor, escreva "Olá"`;

  client.sendMessage(contactId, mensagem)

  client.on('message', message => {

    var mensagemTratada = removerAcentos(message.body).toLowerCase()

    if (mensagemTratada === 'ola') {
      message.reply(`Olá, ${contactName} eu sou o Taioba. Você gostaria de saber sua data que cantará na nossa igreja?`)
    }
    else
      message.reply('Por favor, digite o comando correto para trocarmos ideia')
  }
  )


})
client.initialize();

//ROTAS HTTP API

app.get('/api/v1/home', (req, res) => {
  res.send('Hello World');
});

app.post('/api/v1/send', async (req, res, next) => {


  try {
    const { number, message } = req.body;


    const msg = client.sendMessage(`${number}@c.us`, message); // Envia a msg pro numero
    console.log(`Sera enviada a msg: ${msg}`)
    res.send('mensagem enviada!'); // Send the response
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//INICIA O SERVIDOR

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 avoa - servidor rodando em: http://localhost:${PORT}`));