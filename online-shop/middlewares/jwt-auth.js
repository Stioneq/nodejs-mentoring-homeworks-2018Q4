export default function handle(req, res, next) {
    console.log(req.headers);
    const {authorization} = req.headers;
    if (authorization) {
        const [bearer, token] = authorization && authorization.split(" ");
        if (bearer.toUpperCase() === 'BEARER') {
            next();
        }
    } else {
        res.status(401).end();
    }

}
