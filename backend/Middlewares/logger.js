import fs from "fs";
import path from "path";
import parseError from "../Utils/parseError.js";
import LOG from "../Enums/logTypes.js";

function logger(req, res, next) {
    try {
        res.on("finish", () => {
            const dir = path.join(process.cwd(), "Storage")
            const logsFilePath = path.join(dir, "logs.txt");

            fs.mkdirSync(dir, { recursive: true });

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