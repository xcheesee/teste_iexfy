import http from "node:http"; 
import { db } from './Data/dbContext.js';

const PORT = 3000;

const server = http.createServer((req, res) => {
})

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Servidor em http://127.0.0.1:${PORT}`);
})