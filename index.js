const express = require('express') //minimal web framework(gerencia a API)
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
require('dotenv').config(); //lê arquivos .env
const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.json());



const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr',  qr => {
   qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Conta Conectada com sucesso!');
  //Precisa aguardar essa mensagem antes de executar requisições
})


client.initialize();

const getGroups = async () => {
  try {
    const chats = await client.getChats();
    const groups = chats.filter(chat => chat.isGroup);
    return groups;
  } catch (error) {
    console.error("Falha ao requistar grupos", error);
  }
}


//ROTAS HTTP API

app.get('/api/v1/home', (req, res) => {
  res.send('Hello World');
}); // rota de teste

app.get('/api/v1/getGroups', async (req, res) => {
  var groups = await getGroups();
  var showGroups = [];

  groups.forEach(group =>{
    showGroups.push(group.name,group.id._serialized)
  })

  res.json(showGroups);
}) //Rota para exibir todos os grupos que a conta participa.


app.post('/api/v1/send', async (req, res, next) => {


  try {
    const { number, message } = req.body;


    const msg = client.sendMessage(`${number}@c.us`, message).then(
      res.send('mensagem enviada!')
    ); // Envia a msg pro numero
    console.log(`Sera enviada a msg: ${msg}`)
    // Send the response
  } catch (error) {
    console.log(error);
    next(error);
  }
}); //Rota para enviar mensagem para um contato

app.post('/api/v1/sendGroup', async (req, res, next) => {
  try {
    const { groupId, message } = req.body;
    const msg = client.sendMessage(`${groupId}@g.us`, message).then(
      res.send('mensagem enviada!')
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
})//rota para enviar mensagem para um grupo


//INICIA O SERVIDOR

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 avoa - servidor rodando em: http://localhost:${PORT}`));