import ApiError from "./ApiError.js";

function parseError(res, error) {
    const errJson = {
        error: error.message,
        code: error.code,
        trace: error.stack
    };
    res.statusCode = error.statusCode ?? 500;

    res.end(JSON.stringify(errJson));
}

export default parseError