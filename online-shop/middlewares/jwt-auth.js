import jwt from 'jsonwebtoken';

export default function handle(req, res, next) {
    console.log(req.headers);
    const {authorization} = req.headers;
    if (authorization) {
        const [bearer, token] = authorization && authorization.split(" ");
        if (bearer.toUpperCase() === 'BEARER') {
            jwt.verify(token, 'secret', (err, res) => {
                if(err){
                    res.status(401).end();
                }else {
                    next();
                }
            });
        }
    } else {
        res.status(401).end();
    }

}
