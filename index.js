import app from './src/app.js';
import 'dotenv/config.js';//lê arquivos .env

//INICIA O SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 avoa - servidor rodando em: http://localhost:${PORT}`));