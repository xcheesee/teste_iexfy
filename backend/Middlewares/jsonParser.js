import ApiError from "../Utils/ApiError.js";
import parseError from "../Utils/parseError.js";

async function jsonParser(req, res, next) {
    if(req.method === "POST" || req.method === "PUT") {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const parsed = body ? JSON.parse(body) : {};
                req.body = parsed;
                next();
            } catch(e) {
                parseError(res, new ApiError("Malformed JSON", 400, "INVALID_JSON"));
                return;
            }
        })
    }

}

export default jsonParser;