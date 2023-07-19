import 'dotenv/config.js';//lê arquivos .env

function CheckApi(apikey) {
  const API_KEY = process.env.API_KEY;

  if (apikey !== API_KEY) {
    return false;
  }

  return true;

}

export default CheckApi;