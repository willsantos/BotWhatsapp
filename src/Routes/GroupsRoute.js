import express from 'express';
import ChatGroupController from '../Controllers/ChatGroupController.js';

const router = express.Router();

export default function (client) {
  router
    .get("/api/v2/groups", (req, res) => {
      ChatGroupController.ListarGrupos(req, res, client);
    })
    .post("/api/v2/groups/send", (req, res) => {
      ChatGroupController.EnviarMensagem(req, res, client);
    })

  return router;
}