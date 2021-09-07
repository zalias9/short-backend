require('dotenv').config();
import app from './app/app';
import databaseConnection from './database'

const PORT:number = Number(process.env.PORT) || 8080;

databaseConnection
  .then(() => app.listen(PORT))
  .catch(console.error);