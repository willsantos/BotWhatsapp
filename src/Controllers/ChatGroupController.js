class ChatGroupController {
  //metodo para enviar mensagem para um grupo
  static EnviarMensagem = async (req, res, client) => {
    try {
      const { groupId, message } = req.body;
      client.sendMessage(`${groupId}@g.us`, message).then(
        res.status(201).json('mensagem enviada!')
      );
    } catch (error) {
      res.status(500).json('Falha ao enviar a mensagem: ' + error);
    }
  }

  //metodo para exibir todos os grupos que a conta participa.
  static ListarGrupos = async (req, res, client) => {
    try {
      const chats = await client.getChats();
      const groups = chats.filter(chat => chat.isGroup);
      var showGroups = [];

      groups.forEach(group => {
        showGroups.push(group.name, group.id._serialized)
      });

      res.status(200).json(showGroups);

    } catch (error) {
      res.status(400).json("Falha ao listar grupos: " + error);
    }
  }
}

export default ChatGroupController;