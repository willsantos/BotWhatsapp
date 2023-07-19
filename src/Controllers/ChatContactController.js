import CheckApi from '../Helper/CheckApiKey.js';

class ChatContactController {


  //Metodo para enviar mensagem para um contato
  static EnviarMensagem = async (req, res, client) => {

    if (!CheckApi(req.get("x-api-key"))) {
      res.status(403).json('acesso negado');
    } else {
      try {
        const { number, message } = req.body;
        client.sendMessage(`${number}@c.us`, message)
          .then(
            res.status(201).json('mensagem enviada!')
          );
      } catch (error) {
        console.log(error);
      }
    }


  }
}

export default ChatContactController;