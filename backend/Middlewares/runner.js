function runner (req, res, middlewares, handler) {
    let i = 0;

    function next() {
        const middleware = middlewares[i];
        i++;

        if(!!middleware) {
            return middleware(req, res, next);
        }

        return handler(req, res);
    }

    next();
}

export default runner;