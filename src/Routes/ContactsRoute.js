import express from 'express';
import ChatContactController from '../Controllers/ChatContactController.js';

const router = express.Router();

export default function (client) {
  router
    .post("/api/v2/contact/send", (req, res) => {
      ChatContactController.EnviarMensagem(req, res, client);
    });

  return router;
}



