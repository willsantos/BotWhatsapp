import 'dotenv/config.js';//lê arquivos .env

class ChatContactController {


  //Metodo para enviar mensagem para um contato
  static EnviarMensagem = async (req, res, client) => {
    const API_KEY = process.env.API_KEY;
    let key = req.get("x-api-key");

    if (API_KEY !== key) {
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