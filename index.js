const express = require('express') //minimal web framework(gerencia a API)
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
require('dotenv').config(); //lê arquivos .env



const app = express()


function removerAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const  client =  new Client({
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

  const contactId = '5511999092481@c.us';
  const contact = client.getContactById(contactId);
  const contactName = contact.name;
  const mensagem = `Boa tarde, ${contactId}! Por favor, escreva "Olá"`;

client.sendMessage(contactId, mensagem)

client.on('message', message => {
  
  var mensagemTratada = removerAcentos(message.body).toLowerCase()

  if(mensagemTratada === 'ola')
    {
        message.reply(`Olá, ${contactName} eu sou o Taioba. Você gostaria de saber sua data que cantará na nossa igreja?`)
    }
    else
        message.reply('Por favor, digite o comando correto para trocarmos ideia')
    }
)

    
})

await client.initialize();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));