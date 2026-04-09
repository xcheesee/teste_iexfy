import http from "node:http"; 
import url from "node:url";
import { db } from './Data/dbContext.js';
import oportunidadeController from "./Controllers/oportunidadeController.js";
import ApiError from "./Utils/ApiError.js";

const PORT = 3000;

function parseError(res, error) {
    const errJson = {
        error: error.message,
        code: error.code,
        status: error.statusCode,
    };

    res.end(JSON.stringify(errJson));
}

function parseRes(res, {status = 200, payload = ""}) {
    res.status = status;
    res.end(payload);
};

function parseBody(req) {
    return new Promise((res, rej) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const parsed = body ? JSON.parse(body) : {};
                res(parsed);
            } catch(e) {
                rej(e);
            }
        })
    })

}

const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const parsed = new URL(req.url, `http://${req.headers.host}`);
    const pathArr = parsed.pathname.split('/').filter(val => val != '');

    try {
        if(req.method === "GET" && pathArr[0] === "oportunidades") {
            if(pathArr.length === 1) {

                const payload = oportunidadeController.getAll();
                parseRes(res, {payload})
                return;

            } else if (pathArr.length === 2) {

                const id = parseInt(pathArr[1]);

                if(Number.isNaN(id)) {
                    throw new ApiError("/oportunidade/:id deve ser um numero", 400, "INVALID_ID");
                }

                const payload = oportunidadeController.get(id);
                parseRes(res, {payload});
                return;

            }
        } 

        if(req.method === "POST" && pathArr[0] === "oportunidades" && pathArr.length === 1) {
            const reqBody = parseBody(req);
            parseRes(res, {payload: reqBody});
            return;
        }

    } catch(e) {
        parseError(res, e)
        return
    }
    
    parseError(res, new ApiError("Url not found", 404, "INVALID_URL"));
    return;
})

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Servidor em http://127.0.0.1:${PORT}`);
})