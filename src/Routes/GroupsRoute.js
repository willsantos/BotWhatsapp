import express from 'express';
import ChatGroupController from '../Controllers/ChatGroupController.js';

const router = express.Router();

export default function (client) {
  router
    .get("/api/v1/getGroups", (req, res) => {
      ChatGroupController.ListarGrupos(req, res, client);
    })
    .post("/api/v1/sendGroup", (req, res) => {
      ChatGroupController.EnviarMensagem(req, res, client);
    })

  return router;
}