// import { connectSQL } from '../database/mysql.js';
import createServer from '../server/index.js';

const server = createServer();

try {
  await server.connect({ port: 8080 }); // cambiar puerto
  // connectSQL();
} catch (e) {
  console.log(e);
}