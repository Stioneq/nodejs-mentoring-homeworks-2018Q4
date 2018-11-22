import jwtUtils from '../utils/jwt-utils';

export default function handle(req, res, next) {
    const {
        authorization
    } = req.headers;
    if (authorization) {
        const [bearer, token] = authorization && authorization.split(" ");
        if (bearer.toUpperCase() === 'BEARER') {
            jwtUtils.verify(token).then(user => {
                    req.user = user;
                    next();
                })
                .catch(err => {
                    res.status(401).send('Unauthorized' + err);

                })
        }
    } else {
        res.status(401).end();
    }

}