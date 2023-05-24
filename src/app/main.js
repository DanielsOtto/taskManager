// import { connectSQL } from '../database/mysql.js';
import { PORT } from '../config/config.js';
import createServer from '../server/index.js';

const server = createServer();

try {
  await server.connect({ port: PORT });
  // connectSQL();
} catch (e) {
  console.error(e);
}