class ChatContactController {
  //Metodo para enviar mensagem para um contato
  static EnviarMensagem = async (req, res, client) => {
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

export default ChatContactController;