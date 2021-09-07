import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path';
const parentDir = join(__dirname, '..');

let connectionOpts: ConnectionOptions = {
  type: 'postgres', //only tested for Postgres
  entities: [
    `${parentDir}/**/*.entity.ts`,
    ],
  synchronize: true,
};
// This is specifically for Heroku Cloud
// NOTE: Do not include DATABASE_URL testing locally
if (process.env.DATABASE_URL) {
  connectionOpts = {
    url: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
    ...connectionOpts,
  }
} else {
  // This is for connecting to a local Postgres DB
  // Include the following environment variables in a .env file in the root folder. (Where package.json is)
  connectionOpts = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ...connectionOpts,
  };
}

console.log(connectionOpts);

const connection:Promise<Connection> = createConnection(connectionOpts);

export default connection;