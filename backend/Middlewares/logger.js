import fs from "fs";
import path from "path";
import parseError from "../Utils/parseError.js";
import LOG from "../Enums/logTypes.js";

function logger(req, res, next) {
    try {
        res.on("finish", () => {
            const logsFilePath = path.join(process.cwd(), "Storage", "logs.txt");

            const message = `Log ${LOG.INFO}: ${req.method} ${req.url} ${res.statusCode} - ${new Date().toISOString()} \n`;
        
            fs.writeFile(logsFilePath, message, { flag: 'a'}, (err) => {
                if(err)
                    console.error("Falha ao salvar log: ", err);
            });
        });

        next();

    } catch(e) {
        parseError(res, e);
        return;
    }
}

export default logger;