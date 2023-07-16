import express from "express";
import routes from "./Routes/index.js";
import bodyParser from "body-parser";
import whatsapp from './Services/WhatsappService.js';
const whatsappClient = new whatsapp({});
whatsappClient.initialize();


const app = express();
app.use(bodyParser.json());
routes(app,whatsappClient.client);

export default app;