import http from "node:http"; 
import oportunidadeController from "./Controllers/oportunidadeController.js";
import ApiError from "./Utils/ApiError.js";
import runner from "./Middlewares/runner.js";
import jsonParser from "./Middlewares/jsonParser.js";
import logger from "./Middlewares/logger.js";
import Oportunidade from "./Models/oportunidadeModel.js";
import parseError from "./Utils/parseError.js";

const PORT = 3000;

const middlewares = [
    jsonParser,
    logger,
];

function parseRes(res, {status = 200, payload = ""}) {
    res.statusCode = status;
    res.end(payload);
};

const server = http.createServer(async (req, res) => {
    runner(req, res, middlewares, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
                const reqBody = req.body;

                const oportunidadeRow = new Oportunidade({...reqBody});

                if(!oportunidadeRow.isValid()) {
                    throw new ApiError("Body incorreto", 400, "INVALID_BODY");
                }

                oportunidadeController.insert(oportunidadeRow);

                parseRes(res, {payload: JSON.stringify("Registro inserido com sucesso"), status: 201});
                return;
            }

            if(req.method === "DELETE" && pathArr[0] === "oportunidades" && pathArr.length === 2) {
                const id = parseInt(pathArr[1]);

                if(Number.isNaN(id)) 
                    throw new ApiError("/oportunidades/:id deve ser um numero", 400, "INVALID_ID");

                oportunidadeController.remove(id);
                parseRes(res, {payload: JSON.stringify("Registro excluido com sucesso")});
                return;

            }

            if(req.method === "PUT" && pathArr[0] === "oportunidades" && pathArr.length === 2) {
                const body = req.body;

                const id = parseInt(pathArr[1]);

                if(Number.isNaN(id)) 
                    throw new ApiError("/oportunidades/:id deve ser um numero", 400, "INVALID_ID");

                oportunidadeController.update(id, body);
                parseRes(res, {payload: JSON.stringify("Registro atualizado com sucesso")});
                return;
            }

        } catch(e) {
            parseError(res, e)
            return;
        }
    
        parseError(res, new ApiError("Url not found", 404, "INVALID_URL"));
        return;

    })
})

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Servidor em http://127.0.0.1:${PORT}`);
})