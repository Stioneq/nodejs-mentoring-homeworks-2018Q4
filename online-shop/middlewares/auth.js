import jwt from 'jsonwebtoken';

export default function handle(req, res, next){
    const auth = req.headers.authorization;

    jwt.decode()
}